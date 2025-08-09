package com.hock.tour_booking.repositories;

import com.hock.tour_booking.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    @Query("select p from Payment p where p.id =?1")
    public Payment findByPaymentId(UUID paymentId);

    @Query("select p from Payment p where p.transactionId =?1")
    public Payment findByTransactionId(String transactionId);

    @Query("select p from Payment p where p.booking.id =?1")
    public Payment findByBookingId(UUID bookingId);
}
