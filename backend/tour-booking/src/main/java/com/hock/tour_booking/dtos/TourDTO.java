package com.hock.tour_booking.dtos;

import com.hock.tour_booking.entities.Category;
import com.hock.tour_booking.entities.Review;
import com.hock.tour_booking.entities.User;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Data
public class TourDTO {
    private UUID id;
    private String title;
    private UserDTO host;
    private UUID category;
    private String description;
    private List<String> itinerary = new ArrayList<>();
    private int price;
    private int durationDays;
    private LocalDate departureDate;
    private String destination;
    private Set<String> images = new HashSet<>();
    private String status;
    private LocalDateTime createdAt;
    private boolean featured;
    private Set<ReviewDTO> reviews = new HashSet<>();
    private int maxPeople;

    private int ticketsRemaining;
    private String transportation;
    private String startingLocation;

    @Override
    public String toString() {
        return "TourDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", host=" + host +
                ", category=" + category +
                ", description='" + description + '\'' +
                ", itinerary='" + itinerary + '\'' +
                ", price=" + price +
                ", durationDays=" + durationDays +
                ", departureDate=" + departureDate +
                ", destination='" + destination + '\'' +
                ", images=" + images +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                ", featured=" + featured +
                '}';
    }
}
