package com.hock.tour_booking.controllers;

import com.hock.tour_booking.dtos.CategoryDTO;
import com.hock.tour_booking.dtos.DestinationDTO;
import com.hock.tour_booking.dtos.TourDTO;
import com.hock.tour_booking.dtos.mapper.DestinationDtoMapper;
import com.hock.tour_booking.dtos.mapper.TourDtoMapper;
import com.hock.tour_booking.entities.*;
import com.hock.tour_booking.repositories.RoleRepository;
import com.hock.tour_booking.repositories.UserRepository;
import com.hock.tour_booking.services.CategoryService;
import com.hock.tour_booking.services.DestinationService;
import com.hock.tour_booking.services.TourService;
import com.hock.tour_booking.utils.FilterOption;
import com.hock.tour_booking.utils.GetFilterOption;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/tours")
public class TourController {
    @Autowired
    private TourService tourService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private DestinationService destinationService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
//    @GetMapping
//    public ResponseEntity<List<TourDTO>> getTour() {
//        List<Tour> tours = tourService.findAllTours();
//        List<TourDTO> tourDTOs = TourDtoMapper.tourDTOs(tours);
//        return new ResponseEntity<>(tourDTOs, HttpStatus.ACCEPTED);
//    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getCategories(){
        List<CategoryDTO> categories = categoryService.findAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.ACCEPTED);
    }

    @GetMapping(produces = "application/json;charset=UTF-8")
    public ResponseEntity<Page<TourDTO>> getTours(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
            @RequestParam(required = false) UUID category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "departureDate") String sortName,
            @RequestParam(defaultValue = "asc") String sortDirect) {

        Page<Tour> tours = tourService.findAllTours(destination, departureDate, category, page, size, sortName, sortDirect);
        Page<TourDTO> tourDTOs = TourDtoMapper.tourDTOs(tours);
        return ResponseEntity.ok(tourDTOs);
    }

    @GetMapping(value = "/{id}", produces = "application/json;charset=UTF-8")
    public ResponseEntity<TourDTO> findById(@PathVariable UUID id) throws Exception{
        Tour tour  = tourService.findTourById(id);

        if(tour == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        TourDTO tourDTO = TourDtoMapper.toTourDTO(tour);
        System.out.println("Find tour by id: " + tourDTO);
        return new ResponseEntity<>(tourDTO, HttpStatus.OK);
    }

    @GetMapping(value = "/destinations", produces = "application/json;charset=UTF-8")
    public ResponseEntity<List<DestinationDTO>> getDestinations(){
        List<Destination> destinations = destinationService.findAll();
        List<DestinationDTO> destinationDTOS = DestinationDtoMapper.toDestinationDtos(destinations);
        return new ResponseEntity<>(destinationDTOS, HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/destinations/{id}/tours")
    public ResponseEntity<?> findToursByDestinationId(@PathVariable UUID id){
        List<Tour> tours = tourService.findTourByDestination(id);
        List<TourDTO> tourDTOS = TourDtoMapper.tourDTOs(tours);
        return new ResponseEntity<>(tourDTOS,HttpStatus.OK);
    }

    @GetMapping("/init-roles")
    public ResponseEntity<?> initRoles() {
        Map<String, String> response = new HashMap<>();

        if (roleRepository.count() > 0) {
            response.put("status", "fail");
            response.put("message", "Roles already exist.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        List<String> roleNames = Arrays.asList("ROLE_ADMIN", "ROLE_USER", "ROLE_HOST");
        for (String roleName : roleNames) {
            Role role = new Role();
            role.setId(UUID.randomUUID());
            role.setName(roleName);
            roleRepository.save(role);
        }

        response.put("status", "ok");
        response.put("message", "Roles initialized successfully.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/init-admin-account")
    public ResponseEntity<?> initAdminAccount() throws Exception {
        Map<String, String> response = new HashMap<>();

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        if (adminRole == null) {
            throw new Exception("ROLE_ADMIN not found. Please init roles first.");
        }

        final String email = "huynhkhan91@gmail.com";

        if (userRepository.findByEmail(email) != null) {
            response.put("status", "fail");
            response.put("message", "Admin account already exists.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        final String password = "chikhan123"; // nên đưa vào biến môi trường
        final String address = "HO CHI MINH";
        final String username = "HUYNH VAN CHI KHAN";
        final String phone = "0961800341";
        final Boolean active = true;
        final LocalDateTime lastLogin = LocalDateTime.now();
        final String verifyCode = "1234";
        final String cin = "123123123123";
        final Boolean ban = false;

        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail(email);
        user.setPassword_hash(passwordEncoder.encode(password));
        user.setAddress(address);
        user.setUsername(username);
        user.setPhone_number(phone);
        user.setIs_active(active);
        user.setLast_login(lastLogin);
        user.setVerify_code(verifyCode);
        user.setCin(cin);
        user.setIs_ban(ban);
        user.getRoles().add(adminRole);

        userRepository.save(user);

        response.put("status", "ok");
        response.put("message", "Admin account initialized successfully.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
