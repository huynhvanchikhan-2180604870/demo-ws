package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.ReviewDTO;
import com.hock.tour_booking.dtos.TourDTO;
import com.hock.tour_booking.dtos.UserDTO;
import com.hock.tour_booking.entities.Review;
import com.hock.tour_booking.entities.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ReviewDtoMapper {

    public static ReviewDTO toReviewDTO(Review review) {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(review.getId());
        reviewDTO.setComment(review.getComment());
        reviewDTO.setRating(review.getRating());
        setUser(reviewDTO, review.getUser());
        reviewDTO.setTour(review.getTour().getId());
        reviewDTO.setFullname(reviewDTO.getFullname());
        reviewDTO.setCreatedAt(review.getCreatedAt());
        return reviewDTO;
    }

    public static Set<ReviewDTO> toReviewDTOs(Set<Review> reviews) {
        List<ReviewDTO> reviewDTOs = new ArrayList<>();
        for (Review review : reviews) {
            ReviewDTO reviewDTO = toReviewDTO(review);
            reviewDTOs.add(reviewDTO);
        }
        Set<ReviewDTO> reviewDTOSet = new HashSet<>(reviewDTOs);
        return reviewDTOSet;
    }

//    public static void setTour(ReviewDTO reviewDTO, Review review) {
//        TourDTO tourDTO = TourDtoMapper.toTourDTO(review.getTour());
//        reviewDTO.setTour(tourDTO);
//    }
//
    public static void setUser(ReviewDTO reviewDTO, User user) {
        UserDTO userDTO = UserDtoMapper.toUserDto(user);
        reviewDTO.setUser(userDTO);
    }
}
