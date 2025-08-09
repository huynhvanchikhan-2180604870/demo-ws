package com.hock.tour_booking.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class DestinationDTO {
    private UUID id;
    private String name;
    private int tourCount;
    private String url;
}
