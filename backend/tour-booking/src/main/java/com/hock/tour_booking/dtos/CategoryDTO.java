package com.hock.tour_booking.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class CategoryDTO {
    private UUID id;
    private String name;
}
