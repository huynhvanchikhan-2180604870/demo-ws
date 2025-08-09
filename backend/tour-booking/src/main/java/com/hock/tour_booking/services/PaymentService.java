package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Payment;
import com.hock.tour_booking.exception.PaymentException;

import java.util.UUID;

public interface PaymentService {
    public Payment createPayment(Payment payment);
    public Payment updatePayment(Payment payment);
    public Payment findByPaymentId(UUID paymentId) throws PaymentException;
    public Payment findByTransactionId(String transactionId)throws PaymentException;
    public Payment findByBookingId(UUID bookingId)throws PaymentException;
}
