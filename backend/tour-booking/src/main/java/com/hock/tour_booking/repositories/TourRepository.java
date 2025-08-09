package com.hock.tour_booking.repositories;

import com.hock.tour_booking.entities.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TourRepository extends JpaRepository<Tour, UUID>, JpaSpecificationExecutor<Tour> {
//    public Tour findByName(String name);
//    public List<Tour> findByItinerary(String itinerary);
    @Query("select t from Tour t where t.destination.id = ?1")
    public List<Tour> findTourByDestination(UUID destinationId);

    @Query("select t from Tour t where t.host.id = ?1")
    public List<Tour> findTourByHost(UUID hostId);

}
