package com.hock.tour_booking.repositories;

import com.hock.tour_booking.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
    @Query("select r from Review r where r.tour.id =?1")
    public List<Review> findByTourId(UUID id);
}
