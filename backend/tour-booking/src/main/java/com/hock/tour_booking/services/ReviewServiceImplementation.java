package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Review;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ReviewServiceImplementation implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private TourService tourService;

    @Override
    public List<Review> findAllReviewByTourId(UUID tourId) throws Exception {
        return reviewRepository.findByTourId(tourId);
    }

    @Override
    public Review findReviewByReviewId(UUID reviewId) throws Exception {
        return reviewRepository.findById(reviewId).orElse(null);
    }

    @Override
    public Review saveReview(Review review) throws Exception {
        Review newReview = new Review();
        Tour tour = tourService.findTourById(review.getTour().getId());
        newReview.setId(UUID.randomUUID());
        newReview.setTour(tour);
        newReview.setUser(review.getUser());
        newReview.setRating(review.getRating());
        newReview.setComment(review.getComment());
        newReview.setCreatedAt(LocalDateTime.now());
        newReview.setFullname(review.getFullname());
        Review savedReview = reviewRepository.save(newReview);
        tour.getReviews().add(savedReview);
        return savedReview;
    }

    @Override
    public void deleteReview(UUID reviewId) throws Exception {
        Review review = findReviewByReviewId(reviewId);
        if(review == null){
            throw new Exception("review id not found");
        }
        reviewRepository.delete(review);
    }
}
