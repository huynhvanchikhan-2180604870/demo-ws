package com.hock.tour_booking.controllers;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.hock.tour_booking.config.ZaloPayConfig;
import com.hock.tour_booking.dtos.BookingDTO;
import com.hock.tour_booking.dtos.mapper.BookingDtoMapper;
import com.hock.tour_booking.dtos.request.BookingRequest;
import com.hock.tour_booking.dtos.response.OrderTrackingResponse;
import com.hock.tour_booking.dtos.response.PaymentRequest;
import com.hock.tour_booking.entities.Booking;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.repositories.BookingRepository;
import com.hock.tour_booking.services.BookingService;
import com.hock.tour_booking.services.TourService;
import com.hock.tour_booking.services.UserService;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hock.tour_booking.utils.helper.HashHelper;
import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v2/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private TourService tourService;

    @Autowired
    private UserService userService;
//    @Autowired
//    private BookingService bookingService;

    @PostMapping()
    public ResponseEntity<BookingDTO> createBooking(@RequestHeader("Authorization") String jwt, @RequestBody BookingRequest request) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        if(user == null) {
            throw new Exception("Invalid JWT");
        }

        Tour tour = tourService.findTourById(request.getTour_id());
        if(tour == null) {
            throw new Exception("Invalid tour");
        }

        if(!user.getUsername().equals(request.getFullname())){
            user.setUsername(request.getFullname());
        }

        if(!user.getPhone_number().equals(request.getPhone())){
            user.setPhone_number(request.getPhone());
        }

        user.setCin(request.getCin());

        if (tour.reserveTickets(request.getGuestSize())) {
            // Process payment and create booking if successful
            boolean paymentSuccess = processPayment(request);
            if (paymentSuccess) {
                Booking booking = new Booking();
                booking.setTour(tour);
                booking.setUser(user);
                booking.setNumPeople(request.getGuestSize());
                booking.setTotalPrice(request.getAmount());
                booking.setBookingDate(LocalDateTime.now());
                booking.setPaymentStatus("UNPAID");
                booking.setBookingStatus("CREATED");
                booking.setPaymentMethod(request.getPaymentMethod());
                booking.setDiscountAmount(0);
                Booking create = bookingService.createBooking(booking);
                BookingDTO bookingDTO = BookingDtoMapper.toBookingDTO(create);
                tour.setTicketsRemaining(tour.getTicketsRemaining() - request.getGuestSize());
                return new ResponseEntity<>(bookingDTO, HttpStatus.CREATED);
            } else {
                // Rollback tickets if payment fails
                tour.rollbackReservedTickets();
                return new ResponseEntity<>(new BookingDTO(), HttpStatus.CONFLICT);
            }
        } else {
            throw new Exception("Invalid tour");
        }

    }

    private boolean processPayment(BookingRequest request) {
        // Implementation of payment processing logic
        return true; // Dummy return for example purposes
    }


    @GetMapping("/users")
    public ResponseEntity<List<BookingDTO>> findAllByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Booking> bookings = bookingService.findAllBookingsByUserId(user.getId());
        List<BookingDTO> bookingDTOs = BookingDtoMapper.toBookingDTOs(bookings);
        return new ResponseEntity<>(bookingDTOs, HttpStatus.OK);
    }

    @PutMapping("/cancel/{bookingId}")
    public ResponseEntity<?> cancelTour(@RequestHeader("Authorization") String jwt, @PathVariable UUID bookingId) throws Exception {
        // Lấy thông tin đặt vé
        Booking booking = bookingService.findBookingById(bookingId);
        User user = userService.findUserProfileByJwt(jwt);

        // Kiểm tra xem booking có tồn tại và thuộc về user
        if (booking == null || !booking.getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Kiểm tra điều kiện hủy
        LocalDateTime bookingDate = booking.getBookingDate();
        LocalDateTime now = LocalDateTime.now();

        // Không cho phép hủy nếu quá 3 ngày kể từ ngày đặt
        if (bookingDate.plusDays(3).isBefore(now)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot cancel booking: Cancellation period exceeded.");
        }

        // Lấy thông tin tour liên quan
        Tour tour = booking.getTour();

        // Hoàn vé lại nếu số lượng vé hợp lệ
        int numPeople = booking.getNumPeople();
        synchronized (tour) { // Đảm bảo đồng bộ để tránh xung đột dữ liệu
            tour.setTicketsRemaining(tour.getTicketsRemaining() + numPeople);
        }

        // Cập nhật trạng thái đặt vé
        booking.setBookingStatus("CANCELED");
        booking.setPaymentStatus("NOT REFUNDED");
        booking.setUpdatedAt(LocalDateTime.now());

        BookingDTO saveBookingDTO = BookingDtoMapper.toBookingDTO(booking);
        // Lưu lại booking và tour
        bookingService.updateBooking(saveBookingDTO);
        tourService.updateTour(tour.getId(), tour);

        return new ResponseEntity<>(BookingDtoMapper.toBookingDTO(booking), HttpStatus.OK);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(@RequestHeader("Authorization") String jwt)throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || user.getRoles().stream().anyMatch(role -> role.getName().equals("USER_HOST"))) {
            return new ResponseEntity<>("User FORBIDDEN", HttpStatus.FORBIDDEN);
        }
        System.out.println("HOST: " + user.toString());
        
        List<OrderTrackingResponse> orders = bookingService.getOrderTracking(user.getId());
        System.out.println(orders.size());
        for(OrderTrackingResponse re : orders){
            System.out.println("Order: " + re.getTourName());
        }
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }
}
