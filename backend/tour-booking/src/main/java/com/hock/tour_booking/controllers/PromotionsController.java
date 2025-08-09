package com.hock.tour_booking.controllers;

import com.hock.tour_booking.dtos.PromotionDTO;
import com.hock.tour_booking.entities.Promotion;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.services.EmailService;
import com.hock.tour_booking.services.PromotionService;
import com.hock.tour_booking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v2/promotions")
public class PromotionsController {
    @Autowired
    private PromotionService promotionService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<?> createPromotion(@RequestHeader("Authorization") String jwt, @RequestBody PromotionDTO promotionDTO) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }
        Promotion promotion = promotionService.savePromotion(promotionDTO);
        // Fetch all users with ROLE_USER to send them the promotion email
        List<User> users = userService.findAll();
        List<User> userRoleUser = new ArrayList<>();

        for (User i : users) {
            if (i.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_USER"))) {
                userRoleUser.add(i);
            }
        }
        userRoleUser.forEach(o -> {
            try {
                emailService.sendPromotionEmail(o.getEmail(), promotion);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        return new ResponseEntity<>(promotion, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> findAllPromotions(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }
        List<Promotion> promotions = promotionService.findAllPromotions();

        return new ResponseEntity<>(promotions, HttpStatus.OK);
    }

    @GetMapping("/check/{code}")
    public ResponseEntity<?> checkPromotionValidity(@RequestHeader("Authorization") String jwt, @PathVariable String code) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        if (user == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        Promotion promotion = promotionService.findByCode(code);
        if (promotion == null) {
            return new ResponseEntity<>("Promotion code not found", HttpStatus.NOT_FOUND);
        }

        if (promotion.getEndDate().isBefore(java.time.LocalDate.now())) {
            return new ResponseEntity<>("Promotion code has expired", HttpStatus.GONE);
        }

        return new ResponseEntity<>(promotion, HttpStatus.OK);
    }
}
