package com.hock.tour_booking.repositories;

import com.hock.tour_booking.entities.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, UUID> {
    @Query("select p from Promotion p where p.code = ?1")
    Promotion findByCode(String code);
}
