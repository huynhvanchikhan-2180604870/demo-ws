package com.hock.tour_booking.dtos.response;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;

@Data
public class OrderTrackingResponse {
    private UUID id;
    private String tourName;
    private LocalDateTime bookingDate;
    private int totalPrice;
    private String paymentMethod;
    private String bookingStatus;
    private int ticketsTotal;
    private String paymentStatus;
}
