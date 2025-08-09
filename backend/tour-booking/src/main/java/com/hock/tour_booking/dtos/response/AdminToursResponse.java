package com.hock.tour_booking.dtos.response;

import lombok.Data;

import java.util.UUID;

@Data
public class AdminToursResponse {
    private UUID id;
    private String title;
    private String description;
    private String location;
}
