package com.hock.tour_booking.dtos.request;

import lombok.Data;

import java.util.UUID;

@Data
public class OrderStatusRequest {
    private UUID id;
    private String status;
}
