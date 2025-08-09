package com.hock.tour_booking.entities;

import lombok.*;
import jakarta.persistence.*;
import java.util.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    private int rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private String fullname;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors, getters, setters
}