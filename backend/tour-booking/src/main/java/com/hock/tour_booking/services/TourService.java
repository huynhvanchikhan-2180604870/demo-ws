package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TourService {
    public Tour findTourById(UUID id) throws Exception;
    public List<Tour> findAllTours();
    public Tour createTour(Tour tour);
    public Tour updateTour(UUID id, Tour tour)throws Exception;
    public void deleteTour(UUID id)throws Exception;
    public Page<Tour> findAllTours(String destination, LocalDate departureDate, UUID category, int page, int size, String sortName, String sortDirect);
    public Page<Tour> findAllToursByHost(UUID hostId, String search, int page, int size, String sortName, String sortDirect);
    public List<Tour> findTourByDestination(UUID id);
    public List<Tour> findTourByHostCreateID(UUID hostId);
}
