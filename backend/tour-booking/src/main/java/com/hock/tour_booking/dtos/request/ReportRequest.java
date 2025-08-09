package com.hock.tour_booking.dtos.request;

import lombok.Data;

import java.util.UUID;

@Data
public class ReportRequest {
    private String userId;
    private UUID tourId;
    private boolean descriptionMismatch;
    private boolean scheduleMismatch;
    private boolean overpricing;
    private boolean guideAttitude;
    private boolean guideOther;
    private boolean other;
    private String otherReason;


}
