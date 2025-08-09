package com.hock.tour_booking.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BaseError {
    private String code;
    private String message;
}