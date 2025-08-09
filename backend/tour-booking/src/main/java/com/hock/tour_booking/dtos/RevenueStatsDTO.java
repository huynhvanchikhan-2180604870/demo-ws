package com.hock.tour_booking.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class RevenueStatsDTO {
    private String timePeriod;  // Day, Month, Quarter, Year
    private BigDecimal totalRevenue; // Tổng doanh thu
    private long totalBookings;  // Số lượt đặt
}
