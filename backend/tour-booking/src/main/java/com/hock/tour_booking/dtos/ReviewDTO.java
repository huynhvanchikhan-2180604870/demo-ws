package com.hock.tour_booking.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ReviewDTO {
    private UUID id;
    private UserDTO user;
    private String fullname;
    private UUID tour;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
}
