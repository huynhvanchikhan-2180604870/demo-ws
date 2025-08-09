package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.TourDTO;
import com.hock.tour_booking.entities.Destination;
import com.hock.tour_booking.entities.Review;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.repositories.DestinationRepository;
import com.hock.tour_booking.repositories.TourCustomRepo;
import com.hock.tour_booking.repositories.TourRepository;
import com.hock.tour_booking.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class TourServiceImplementation implements TourService {
    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private DestinationRepository destinationRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public Tour findTourById(UUID id) throws Exception{
        Tour tour = tourRepository.findById(id).orElse(null);
        if (tour == null) {
            throw  new Exception("Tour not found");
        }

        List<Review> reviewList = reviewService.findAllReviewByTourId(tour.getId());
        Set<Review> reviews = new HashSet<>(reviewList); // Convert List to Set
        for (Review review : reviews) {
            tour.getReviews().add(review);
        }
        tourRepository.save(tour);
        return tour;
    }

    @Override
    public List<Tour> findAllTours() {
        return tourRepository.findAll();
    }

    @Override
    public Tour createTour(Tour tour) {
        Tour newTour = new Tour();
        Destination destination = destinationRepository.findById(tour.getDestination().getId()).orElseThrow(() -> new RuntimeException("Destination not found"));
        newTour.setId(UUID.randomUUID());
        newTour.setTitle(tour.getTitle());
        newTour.setDescription(tour.getDescription());
        newTour.setPrice(tour.getPrice());
        newTour.setCategory(tour.getCategory());
        newTour.setCreatedAt(LocalDateTime.now());
        newTour.setUpdatedAt(tour.getUpdatedAt());
        newTour.setHost(tour.getHost());
        newTour.setDestination(destination);
        newTour.setDepartureDate(tour.getDepartureDate());
        newTour.setDurationDays(tour.getDurationDays());
        newTour.setItinerary(tour.getItinerary());
        newTour.setStatus("CREATED");
        newTour.setFeatured(tour.isFeatured());
        newTour.setImages(tour.getImages());
        newTour.setMaxPeople(tour.getMaxPeople());
        newTour.setStartingLocation(tour.getStartingLocation());
        newTour.setTicketsRemaining(tour.getMaxPeople());
        newTour.setTransportation(tour.getTransportation());
        Tour saveTour = tourRepository.save(newTour);
        int newCount = destination.getTours() != null ? destination.getTours().size() : 0;
        destination.setTourCount(newCount);
        destinationRepository.save(destination);
        return saveTour;
    }

    @Override
    public Tour updateTour(UUID id, Tour tour) throws Exception{
        Tour newTour = tourRepository.findById(id).orElse(null);
        if(newTour == null) {
            throw new Exception("Tour not found!");
        }

        if(tour.getTitle() != null) {
            newTour.setTitle(tour.getTitle());
        }
        if(tour.getDescription() != null) {
            newTour.setDescription(tour.getDescription());
        }

        newTour.setPrice(tour.getPrice());

        if(tour.getCategory() != null) {
            newTour.setCategory(tour.getCategory());
        }

        if(tour.getCreatedAt() != null) {
            newTour.setCreatedAt(tour.getCreatedAt());
        }

        if(tour.getHost() != null) {
            newTour.setHost(tour.getHost());
        }

        if(tour.getDestination() != null) {
            newTour.setDestination(tour.getDestination());
        }

        if(tour.getDepartureDate() != null) {
            newTour.setDepartureDate(tour.getDepartureDate());
        }

        newTour.setDurationDays(tour.getDurationDays());

        if(tour.getItinerary() != null) {
            newTour.setItinerary(tour.getItinerary());
        }

        if(tour.getStatus() != null) {
            newTour.setStatus(tour.getStatus());
        }

        if(tour.getImages() != null){
            newTour.setImages(tour.getImages());
        }

        if(tour.getTransportation() != null) {
            newTour.setTransportation(tour.getTransportation());
        }

        if(tour.getStartingLocation() != null) {
            newTour.setStartingLocation(tour.getStartingLocation());
        }

        newTour.setMaxPeople(tour.getMaxPeople());
        newTour.setFeatured(tour.isFeatured());
        newTour.setUpdatedAt(LocalDateTime.now());
        Tour saveTour = tourRepository.save(newTour);
        return saveTour;
    }

    @Override
    public void deleteTour(UUID id) throws Exception{
        Tour tourToDelete = tourRepository.findById(id).orElse(null);
        if(tourToDelete != null) {
            tourRepository.delete(tourToDelete);
        }else{
            throw new Exception("Tour not found!");
        }
    }

    @Override
    public Page<Tour> findAllTours(String destination, LocalDate departureDate, UUID category, int page, int size, String sortName, String sortDirect) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirect), sortName);
        Pageable pageable = PageRequest.of(page, size, sort);
        return tourRepository.findAll(TourCustomRepo.search(destination, departureDate, category), pageable);
    }

    @Override
    public Page<Tour> findAllToursByHost(UUID hostId, String search, int page, int size, String sortName, String sortDirect) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirect), sortName);
        Pageable pageable = PageRequest.of(page, size, sort);
        return tourRepository.findAll(TourCustomRepo.byHostIdAndSearch(hostId, search), pageable);
    }

    @Override
    public List<Tour> findTourByDestination(UUID id){
        return tourRepository.findTourByDestination(id);
    }

    @Override
    public List<Tour> findTourByHostCreateID(UUID hostId){
        User user  = userRepository.findById(hostId).orElse(null);
        if(user != null) {
//            return tourRepositor
            return tourRepository.findTourByHost(user.getId());
        }
        return null;
    }
}
