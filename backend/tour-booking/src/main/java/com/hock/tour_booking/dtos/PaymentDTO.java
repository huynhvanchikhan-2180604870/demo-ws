package com.hock.tour_booking.dtos;

import com.hock.tour_booking.entities.Booking;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
@Data
public class PaymentDTO {

    private UUID id;

    private UUID booking;

    private int amount;

    private LocalDateTime paymentDate;

    private String paymentMethod;

    private String transactionId;

    private String status;

    private LocalDateTime createdAt;
}
