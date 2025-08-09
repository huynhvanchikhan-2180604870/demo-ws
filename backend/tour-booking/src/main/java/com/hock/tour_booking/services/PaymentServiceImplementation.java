package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Payment;
import com.hock.tour_booking.exception.PaymentException;
import com.hock.tour_booking.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentServiceImplementation implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment createPayment(Payment payment) {
        Payment newPayment = new Payment();
        newPayment.setId(UUID.randomUUID());
        newPayment.setBooking(payment.getBooking());
        newPayment.setAmount(payment.getAmount());
        newPayment.setPaymentDate(LocalDateTime.now());
        newPayment.setPaymentMethod(payment.getPaymentMethod());
        newPayment.setTransactionId(payment.getTransactionId());
        newPayment.setStatus("CREATED");
        newPayment.setCreatedAt(LocalDateTime.now());
        Payment savedPayment = paymentRepository.save(newPayment);
        return savedPayment;
    }

    @Override
    public Payment updatePayment(Payment payment) {
        Payment newPayment = paymentRepository.findByPaymentId(payment.getId());

        if(payment.getStatus() != null){
            newPayment.setStatus(payment.getStatus());
        }

        Payment savedPayment = paymentRepository.save(newPayment);
        return savedPayment;
    }

    @Override
    public Payment findByPaymentId(UUID paymentId) throws PaymentException {
        return paymentRepository.findByPaymentId(paymentId);
    }

    @Override
    public Payment findByTransactionId(String transactionId) throws PaymentException {
        return paymentRepository.findByTransactionId(transactionId);
    }

    @Override
    public Payment findByBookingId(UUID bookingId) throws PaymentException {
        return paymentRepository.findByBookingId(bookingId);
    }
}
