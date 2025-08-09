package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Destination;
import com.hock.tour_booking.exception.DestinationException;

import java.util.List;

public interface DestinationService {
    public List<Destination> findAll();
    public Destination createDestination(String name);
    public Destination findByName(String name) throws DestinationException;
}
