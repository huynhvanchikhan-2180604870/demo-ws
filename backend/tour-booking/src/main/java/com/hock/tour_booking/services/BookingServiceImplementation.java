package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.BookingDTO;
import com.hock.tour_booking.dtos.RegistrationStat;
import com.hock.tour_booking.dtos.RevenueStatsDTO;
import com.hock.tour_booking.dtos.response.OrderTrackingResponse;
import com.hock.tour_booking.entities.Booking;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.exception.BookingException;
import com.hock.tour_booking.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.token.TokenService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingServiceImplementation implements BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private TourService tourService;


    @Override
    public Booking createBooking(Booking booking) throws Exception{
        Booking newBooking = new Booking();
        newBooking.setId(UUID.randomUUID());
        newBooking.setUser(booking.getUser());
        newBooking.setTour(booking.getTour());
        newBooking.setNumPeople(booking.getNumPeople());
        newBooking.setBookingDate(LocalDateTime.now());
        newBooking.setTotalPrice(booking.getTotalPrice());
        newBooking.setPromotion(null);
        newBooking.setDiscountAmount(booking.getDiscountAmount());
        newBooking.setFinalPrice(booking.getFinalPrice());
        newBooking.setPaymentStatus(booking.getPaymentStatus());
        newBooking.setBookingStatus(booking.getBookingStatus());
        newBooking.setPaymentMethod(booking.getPaymentMethod());
        newBooking.setCreatedAt(LocalDateTime.now());
        newBooking.setUpdatedAt(booking.getUpdatedAt());
        newBooking.setZtranstionId(booking.getZtranstionId());
        newBooking.setQrBase64(null);
        Booking savedBooking = bookingRepository.save(newBooking);
        return savedBooking;
    }

    @Override
    public Booking findBookingById(UUID id) throws BookingException {
        return bookingRepository.findBookingById(id);
    }

    @Override
    public void cancelBooking(UUID id) throws BookingException {
        Booking booking = findBookingById(id);
        if(booking == null) throw new BookingException("Booking not found");
        bookingRepository.delete(booking);

    }

    @Override
    public Booking updateBooking(BookingDTO booking) throws BookingException {
        Booking currentBooking = findBookingById(booking.getId());
        if(currentBooking == null) throw new BookingException("Booking not found");

        if(booking.getNumPeople() != currentBooking.getNumPeople()) {
            currentBooking.setNumPeople(booking.getNumPeople());
        }

        if(booking.getBookingStatus() != null) {
            currentBooking.setBookingStatus(booking.getBookingStatus());
        }

        if(currentBooking.getFinalPrice() != booking.getFinalPrice()) {
            currentBooking.setFinalPrice(booking.getFinalPrice());
        }

        if(booking.getPaymentStatus() != null) {
            currentBooking.setPaymentStatus(booking.getPaymentStatus());
        }

        if(booking.getBookingStatus() != null) {
            currentBooking.setBookingStatus(booking.getBookingStatus());
        }

        if(currentBooking.getDiscountAmount() != booking.getDiscountAmount()) {
            currentBooking.setDiscountAmount(booking.getDiscountAmount());
        }

        if (currentBooking.getTotalPrice() != booking.getTotalPrice()) {
            currentBooking.setTotalPrice(booking.getTotalPrice());
        }

        if(currentBooking.getQrBase64() != booking.getQrBase64()) {
            currentBooking.setQrBase64(booking.getQrBase64());
        }

        if(booking.getZtranstionId() != null){
            currentBooking.setZtranstionId(booking.getZtranstionId());
        }

        currentBooking.setUpdatedAt(LocalDateTime.now());
        bookingRepository.save(currentBooking);
        return currentBooking;
    }

    @Override
    public List<Booking> findAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> findAllBookingsByUserId(UUID userId) {
        return bookingRepository.findAllByUserId(userId);
    }

    @Override
    public Map<String, List<RegistrationStat>> calculateHostStats(UUID hostId, String period, String startDate, String endDate, UUID tourId) {
        // Fetch bookings by tourId (if provided) and hostId
        List<Booking> bookings = bookingRepository.findBookingsByTourHostId(hostId, tourId);

        // Group the bookings by period and count registrations
        return bookings.stream()
                .collect(Collectors.groupingBy(
                        booking -> formatPeriod(booking.getBookingDate().toLocalDate(), period),
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                list -> Collections.singletonList(new RegistrationStat(formatPeriod(list.get(0).getBookingDate().toLocalDate(), period), list.size()))
                        )
                ));
    }

    private String formatPeriod(LocalDate date, String period) {
        switch (period.toLowerCase()) {
            case "year":
                return String.valueOf(date.getYear());
            case "month":
                return date.getYear() + "-" + date.getMonthValue();
            case "day":
                return date.getYear() + "-" + date.getMonthValue() + "-" + date.getDayOfMonth();
            default:
                return "";
        }
    }

    public Map<String, Integer> calculateRevenueStatsByHostAndMonth(UUID hostId, LocalDate startOfMonth, LocalDate endOfMonth) {
        List<Tour> tours = tourService.findTourByHostCreateID(hostId);
        List<UUID> tourIds = tours.stream().map(Tour::getId).collect(Collectors.toList());

        LocalDateTime startDateTime = startOfMonth.atStartOfDay(); // Start of the month
        LocalDateTime endDateTime = endOfMonth.atTime(23, 59, 59); // End of the month

        List<Booking> bookings = bookingRepository.findBookingsByTourIdsAndDateRange(tourIds, startDateTime, endDateTime);
        return bookings.stream()
                .collect(Collectors.groupingBy(
                        booking -> booking.getBookingDate().getMonth().toString() + " " + booking.getBookingDate().getYear(),
                        Collectors.summingInt(Booking::getTotalPrice)
                ));
    }

    @Override
    public List<OrderTrackingResponse> getOrderTracking(UUID hostId) throws Exception{
        List<Booking> bookings = bookingRepository.findBookingByHost(hostId);
        
        List<OrderTrackingResponse> responses = new ArrayList<>();
        for(Booking booking : bookings){
            OrderTrackingResponse response = new OrderTrackingResponse();
            response.setId(booking.getId());
            response.setBookingDate(booking.getBookingDate());
            response.setBookingStatus(booking.getBookingStatus());
            response.setTicketsTotal(booking.getNumPeople());
            response.setTotalPrice(booking.getTotalPrice());
            response.setPaymentMethod(booking.getPaymentMethod());
            response.setTourName(booking.getTour().getTitle());
            response.setPaymentStatus(booking.getPaymentStatus());
            responses.add(response);
            System.out.println("Bookings: " + booking.getTour().getTitle());
        }
        return responses;
    }

    @Override
    public List<RevenueStatsDTO> getRevenueStats(String timePeriod, ZonedDateTime startDate, ZonedDateTime endDate) {
        return bookingRepository.findRevenueStatsByTimePeriod(timePeriod, startDate, endDate);
    }
}
