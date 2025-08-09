package com.hock.tour_booking.entities;
import lombok.*;
import jakarta.persistence.*;
import java.util.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "favorites")
public class Favorite {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @Column(name = "saved_at")
    private LocalDateTime savedAt;
}
