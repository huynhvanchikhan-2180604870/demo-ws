package com.hock.tour_booking.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ReportDTO {
    private UUID id;
    private UUID userId;
    private UUID tourId;
    private boolean descriptionMismatch;
    private boolean scheduleMismatch;
    private boolean overpricing;
    private boolean guideAttitude;
    private boolean guideOther;
    private boolean other;
    private String otherReason;
    private LocalDateTime createdAt;
}
