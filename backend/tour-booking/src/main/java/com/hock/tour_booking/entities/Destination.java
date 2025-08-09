package com.hock.tour_booking.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "destinations")
public class Destination {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(name = "url_image")
    private String url;

    @OneToMany(mappedBy = "destination")
    private Set<Tour> tours; // Each destination has many tours
    // Constructors, getters, and setters as needed
    @Transient  // Use @Transient if you don't want to store it in the database
    private int tourCount;  // To store the count of tours dynamically

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Destination destination = (Destination) o;
        return Objects.equals(id, destination.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
