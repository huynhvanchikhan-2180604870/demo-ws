package com.hock.tour_booking.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hock.tour_booking.entities.HostRegister;

@Repository
public interface HostRegisterRepository extends JpaRepository<HostRegister, UUID>{
    @Query("Select h from HostRegister h where h.email = ?1")
    public HostRegister findByEmail(String email);
}