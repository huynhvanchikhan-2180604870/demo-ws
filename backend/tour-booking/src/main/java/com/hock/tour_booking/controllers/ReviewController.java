package com.hock.tour_booking.controllers;


import com.hock.tour_booking.dtos.ReviewDTO;
import com.hock.tour_booking.entities.Review;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.services.ReviewService;
import com.hock.tour_booking.services.TourService;
import com.hock.tour_booking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v2/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;
    @Autowired
    private TourService tourService;

    @PostMapping("/create")
    public ResponseEntity<?> addReview(@RequestHeader("Authorization") String jwt,@RequestBody ReviewDTO reviewDTO) {
        try {
            User user = userService.findUserProfileByJwt(jwt);
            Tour tour = tourService.findTourById(reviewDTO.getTour());
            Review review = new Review();
            review.setUser(user);
            review.setTour(tour);
            review.setRating(reviewDTO.getRating());
            review.setComment(reviewDTO.getComment());
            review.setCreatedAt(LocalDateTime.now());
            review.setFullname(user.getUsername());
            Review savedReview = reviewService.saveReview(review);
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
