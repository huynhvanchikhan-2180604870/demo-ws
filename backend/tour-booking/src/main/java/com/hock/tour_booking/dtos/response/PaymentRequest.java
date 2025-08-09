package com.hock.tour_booking.dtos.response;

import lombok.Data;

import java.util.UUID;

@Data
public class PaymentRequest {
    private UUID bookingId;
    private String appuser;
    private int amount;
    private String order_id;
    private String qrUrl;
    private String paymentMethod;
}
