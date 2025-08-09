package com.hock.tour_booking.dtos;

import com.hock.tour_booking.entities.Promotion;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BookingDTO {
    private UUID id;
    private UUID user;
    private UUID tour;
    private int numPeople;
    private LocalDateTime bookingDate;
    private int totalPrice;
    private UUID promotion;
    private int discountAmount;
    private int finalPrice;
    private String paymentStatus;
    private String bookingStatus;
    private String paymentMethod;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String qrBase64;
    private String ztranstionId;
    private String fullname;
    private String tourname;
}
