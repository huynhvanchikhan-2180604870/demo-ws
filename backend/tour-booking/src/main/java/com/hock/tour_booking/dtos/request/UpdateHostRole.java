package com.hock.tour_booking.dtos.request;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateHostRole {
    private UUID userId;
    private UUID roleId;
}
