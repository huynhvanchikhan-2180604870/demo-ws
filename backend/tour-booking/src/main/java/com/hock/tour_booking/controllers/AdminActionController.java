package com.hock.tour_booking.controllers;

import com.hock.tour_booking.dtos.*;
import com.hock.tour_booking.dtos.mapper.BookingDtoMapper;
import com.hock.tour_booking.dtos.mapper.HostRegisterDtoMapper;
import com.hock.tour_booking.dtos.mapper.TourDtoMapper;
import com.hock.tour_booking.dtos.mapper.UserDtoMapper;
import com.hock.tour_booking.dtos.request.UpdateTourStatus;
import com.hock.tour_booking.entities.*;
import com.hock.tour_booking.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hock.tour_booking.dtos.request.UserRequets;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v2/admin")
public class AdminActionController {
 
    @Autowired
    private UserService userService;
    @Autowired
    private TourService tourService;

    @Autowired
    private EmailService emailService;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private HostRegisterService hostRegisterService;
//    @Autowired
//    private RevenueService revenueService;

    @GetMapping("/tours")
    public ResponseEntity<?> getAllTour(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

        List<Tour> tours = tourService.findAllTours();
        List<TourDTO> tourDTOs = TourDtoMapper.tourDTOs(tours);
        for (TourDTO tourDTO : tourDTOs) {
            System.out.println(tourDTO.toString());
        }
        return new ResponseEntity<>(tourDTOs, HttpStatus.OK);
    }

    @PostMapping("/tours-status")
    public ResponseEntity<?> updateTours(@RequestHeader("Authorization") String jwt, @RequestBody UpdateTourStatus request) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

        Tour tour = tourService.findTourById(request.getId());

        if (tour == null) {
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }

        tour.setStatus(request.getStatus());
        Tour updateTour = tourService.updateTour(request.getId(), tour);
        emailService.sendTourStatusUpdateToHost(updateTour);
        TourDTO tourDTO = TourDtoMapper.toTourDTO(updateTour);
        return new ResponseEntity<>(tourDTO, HttpStatus.OK);
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookings(@RequestHeader("Authorization") String jwt) throws Exception {
        // Kiểm tra quyền Admin
        User user = userService.findUserProfileByJwt(jwt);

        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

        // Lấy danh sách tất cả booking
        List<Booking> bookings = bookingService.findAllBookings();

        // Chuyển đổi từ Booking sang BookingDTO
        List<BookingDTO> bookingDTOs = BookingDtoMapper.toBookingDTOs(bookings);

        return new ResponseEntity<>(bookingDTOs, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<?> findAllUser(@RequestHeader("Authorization") String jwt) throws Exception {
        // Kiểm tra quyền Admin
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

        List<User> users = userService.findAll();
        List<UserDTO> userDTOs = UserDtoMapper.toUserDtos(users);
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @PostMapping("/user-lock/{userId}")
    public ResponseEntity<?> lockUserAccount(@RequestHeader("Authorization") String jwt, @PathVariable UUID userId) throws Exception {
        // Kiểm tra quyền Admin
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

        // Khóa tài khoản người dùng
        User updatedUser = userService.lockUserAccount(userId);
        if (updatedUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("User account locked successfully", HttpStatus.OK);
    }

    @PostMapping("/user-unlock/{userId}")
    public ResponseEntity<?> unlockUserAccount(@RequestHeader("Authorization") String jwt, @PathVariable UUID userId) throws Exception {
        // Kiểm tra quyền Admin
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

        // Mở khóa tài khoản người dùng
        User updatedUser = userService.unlockUserAccount(userId);
        if (updatedUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("User account unlocked successfully", HttpStatus.OK);
    }
    @GetMapping("/categories")
    public ResponseEntity<?> findAllCategories(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }
        List<CategoryDTO> categories = categoryService.findAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/categories")
    public ResponseEntity<?> findAll(@RequestHeader("Authorization") String jwt, @RequestBody CategoryDTO categoryDTO) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }
        CategoryDTO saveCate = categoryService.createCategory(categoryDTO);
        return new ResponseEntity<>(saveCate, HttpStatus.CREATED);
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<?> deleteCategory(@RequestHeader("Authorization") String jwt, @PathVariable UUID id) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }
        Category category = categoryService.findById(id);
        if(category == null){
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }
        categoryService.deleteCategory(category.getId());
        return new ResponseEntity<>("Delete success", HttpStatus.OK);
    }

    @GetMapping("/revenue/stats")
    public ResponseEntity<?> getRevenueStats(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String timePeriod,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ISO_ZONED_DATE_TIME;

        ZonedDateTime start = startDate != null ? ZonedDateTime.parse(startDate, formatter) : null;
        ZonedDateTime end = endDate != null ? ZonedDateTime.parse(endDate, formatter) : null;

        List<RevenueStatsDTO> stats = bookingService.getRevenueStats(timePeriod, start, end);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/register-hosts")
    public ResponseEntity<?> findAllRegisterHost(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }
        List<HostRegister> list = hostRegisterService.findAll();
        List<HostRegisterDTO> response = HostRegisterDtoMapper.toHostRegisters(list);
        System.out.println("Host data" + response.size());
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("accept-host/{id}")
    public ResponseEntity<?> accpeptHost(@RequestHeader("Authorization") String jwt, @PathVariable UUID id) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }

        HostRegister hostRegister = hostRegisterService.findById(id);
        if(hostRegister == null){
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }

        User userhost = userService.addHost(hostRegister);
        System.out.println("admin" + user.toString());
        System.out.println("host" + userhost.toString());
        UserDTO userDTO = UserDtoMapper.toUserDto(userhost);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

}
