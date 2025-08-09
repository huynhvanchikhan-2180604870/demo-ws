package com.hock.tour_booking.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "tours")
public class Tour {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private User host;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "tour_itinerary", joinColumns = @JoinColumn(name = "tour_id"))
    @OrderColumn(name = "day_order")
    @Column(name = "itinerary_step", columnDefinition = "TEXT")
    private List<String> itinerary = new ArrayList<>();


    @Column(nullable = false)
    private int price;

    @Column(name = "duration_days")
    private int durationDays;

    @Column(name = "departure_date")
    private LocalDate departureDate;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;


    @ElementCollection
    @CollectionTable(name = "tour_images", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "image_url")
    private Set<String> images = new HashSet<>();

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "featured")
    private boolean featured;

    @OneToMany(mappedBy = "tour", fetch = FetchType.LAZY)
    private Set<Review> reviews = new HashSet<>();

    @Column(name = "max_peole")
    private int maxPeople;

    @Column(name = "starting_location")
    private String startingLocation;

    @Column(name = "transportation")
    private String transportation;

    @Column(name = "tickets_remaining")
    private int ticketsRemaining;

    @Transient
    private int reservedTickets = 0;

    public synchronized boolean reserveTickets(int numberOfTickets) {
        if (this.ticketsRemaining >= numberOfTickets) {
            this.ticketsRemaining -= numberOfTickets;
            this.reservedTickets += numberOfTickets;
            return true;
        }
        return false;
    }

    public synchronized void rollbackReservedTickets() {
        this.ticketsRemaining += this.reservedTickets;
        this.reservedTickets = 0;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tour tour = (Tour) o;
        return Objects.equals(id, tour.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Tour{" +
                "id=" + id +
                ", host=" + host +
                ", category=" + category +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", itinerary=" + itinerary +
                ", price=" + price +
                ", durationDays=" + durationDays +
                ", departureDate=" + departureDate +
                ", destination=" + destination +
                ", images=" + images +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", featured=" + featured +
                ", reviews=" + reviews +
                ", maxPeople=" + maxPeople +
                ", startingLocation='" + startingLocation + '\'' +
                ", transportation='" + transportation + '\'' +
                ", ticketsRemaining=" + ticketsRemaining +
                ", reservedTickets=" + reservedTickets +
                '}';
    }

    @OneToMany(mappedBy = "tourReport", cascade = CascadeType.ALL)
    @JsonIgnore // Hoặc sử dụng @JsonManagedReference nếu cần serialize
    private List<Report> reports;
}
