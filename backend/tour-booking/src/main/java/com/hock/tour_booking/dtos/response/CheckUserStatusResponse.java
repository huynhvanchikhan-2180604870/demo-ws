package com.hock.tour_booking.dtos.response;

import lombok.Data;

@Data
public class CheckUserStatusResponse {
    private boolean status;
    private String message;
}
