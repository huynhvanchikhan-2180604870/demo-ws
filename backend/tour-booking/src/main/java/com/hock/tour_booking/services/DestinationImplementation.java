package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Destination;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.exception.DestinationException;
import com.hock.tour_booking.repositories.DestinationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DestinationImplementation implements DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;
    @Autowired
    private TourService tourService;

    @Override
    public List<Destination> findAll() {
        updateTourCounts(); // Update counts before returning the list
        return destinationRepository.findAll();
    }

    @Override
    public Destination createDestination(String name) {
        Destination destination = new Destination();
        destination.setId(UUID.randomUUID());
        destination.setName(name);
        Destination savedDestination = destinationRepository.save(destination);
        return savedDestination;
    }

    @Override
    public Destination findByName(String name) throws DestinationException {
        Destination destination = destinationRepository.findByName(name);
        if (destination == null) {

            return null;
        }
        return destination;
    }

    @Transactional
    public void updateTourCounts() {
        List<Destination> destinations = destinationRepository.findAll();
        for (Destination destination : destinations) {
            List<Tour> tours = tourService.findTourByDestination(destination.getId());
            destination.setTourCount(tours.size());
            destinationRepository.save(destination); // Assuming this persists the changes
        }
    }
}
