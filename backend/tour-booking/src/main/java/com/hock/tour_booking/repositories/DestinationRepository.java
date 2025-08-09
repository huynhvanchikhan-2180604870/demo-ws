package com.hock.tour_booking.repositories;

import com.hock.tour_booking.entities.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, UUID> {
    @Query("select d from Destination d where d.name = ?1")
    public Destination findByName(String name);
}
