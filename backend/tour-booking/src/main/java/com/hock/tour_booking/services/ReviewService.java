package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Review;

import java.util.List;
import java.util.UUID;

public interface ReviewService {
    public List<Review> findAllReviewByTourId(UUID tourId) throws Exception;
    public Review findReviewByReviewId(UUID reviewId) throws Exception;
    public Review saveReview(Review review) throws Exception;
    public void deleteReview(UUID reviewId) throws Exception;
}
