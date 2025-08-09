package com.hock.tour_booking.dtos.request;

import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.UUID;

@Data
public class BookingRequest {
    private String fullname;
    private String cin;
    private String phone;
    private int guestSize;
    private int amount;
    private UUID tour_id;
    private String paymentMethod;
}
