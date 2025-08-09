package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.PaymentDTO;
import com.hock.tour_booking.entities.Payment;

import java.util.ArrayList;
import java.util.List;

public class PaymentDtoMapper {
    public static PaymentDTO toPaymentDTO(Payment payment) {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setId(payment.getId());
        paymentDTO.setBooking(payment.getBooking().getId());
        paymentDTO.setAmount(payment.getAmount());
        paymentDTO.setPaymentDate(payment.getPaymentDate());
        paymentDTO.setPaymentMethod(payment.getPaymentMethod());
        paymentDTO.setTransactionId(payment.getTransactionId());
        paymentDTO.setStatus(payment.getStatus());
        paymentDTO.setCreatedAt(payment.getCreatedAt());
        return paymentDTO;
    }

    public static List<PaymentDTO> toPaymentDTOs(List<Payment> payments) {
        List<PaymentDTO> paymentDTOS = new ArrayList<>();
        for (Payment payment : payments) {
            PaymentDTO paymentDTO = toPaymentDTO(payment);
            paymentDTOS.add(paymentDTO);
        }
        return paymentDTOS;
    }
}
