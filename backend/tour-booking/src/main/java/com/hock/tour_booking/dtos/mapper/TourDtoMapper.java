package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.CategoryDTO;
import com.hock.tour_booking.dtos.ReviewDTO;
import com.hock.tour_booking.dtos.TourDTO;
import com.hock.tour_booking.dtos.UserDTO;
import com.hock.tour_booking.entities.Review;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class TourDtoMapper {
    @Autowired
    private static UserService userService;


    public static TourDTO toTourDTO(Tour tour) {
        TourDTO tourDTO = new TourDTO();
        tourDTO.setId(tour.getId());
        tourDTO.setTitle(tour.getTitle());
        tourDTO.setDescription(tour.getDescription());
        tourDTO.setPrice(tour.getPrice());
        categoryTourDto(tourDTO, tour);
        hostTourDto(tourDTO, tour);
        tourDTO.setCreatedAt(tour.getCreatedAt());
        tourDTO.setImages(tour.getImages());
        tourDTO.setDepartureDate(tour.getDepartureDate());
        tourDTO.setItinerary(tour.getItinerary());
        tourDTO.setStatus(tour.getStatus());
        tourDTO.setDestination(tour.getDestination().getName());
        tourDTO.setStatus(tour.getStatus());
        tourDTO.setImages(tour.getImages());
        tourDTO.setFeatured(tour.isFeatured());
        tourDTO.setDurationDays(tour.getDurationDays());
        tourDTO.setMaxPeople(tour.getMaxPeople());
        setReview(tourDTO, tour.getReviews());
        tourDTO.setStartingLocation(tour.getStartingLocation());
        tourDTO.setTicketsRemaining(tour.getTicketsRemaining());
        tourDTO.setTransportation(tour.getTransportation());
        return tourDTO;
    }

    public static void hostTourDto(TourDTO tourDTO, Tour tour) {
        UserDTO host = UserDtoMapper.toUserDto(tour.getHost());

        tourDTO.setHost(host);
    }

    public static void categoryTourDto(TourDTO tourDTO, Tour tour) {
        CategoryDTO categoryDTO =  CategoryDtoMapper.toCategoryDTO(tour.getCategory());
        tourDTO.setCategory(categoryDTO.getId());
    }

    public static List<TourDTO> tourDTOs(List<Tour> tours) {
        List<TourDTO> tourDTOs = new ArrayList<>();
        for (Tour tour : tours) {
            TourDTO tourDTO = TourDtoMapper.toTourDTO(tour);
            tourDTOs.add(tourDTO);
        }
        return tourDTOs;
    }

    public static Page<TourDTO> tourDTOs(Page<Tour> tours) {
        return tours.map(TourDtoMapper::toTourDTO);
    }

    public static void setReview(TourDTO tourDTO, Set<Review> reviews) {
        Set<ReviewDTO> reviewDTOs = ReviewDtoMapper.toReviewDTOs(reviews);
        Set<ReviewDTO> result = new HashSet<>(reviewDTOs);
        tourDTO.setReviews(result);
    }
}
