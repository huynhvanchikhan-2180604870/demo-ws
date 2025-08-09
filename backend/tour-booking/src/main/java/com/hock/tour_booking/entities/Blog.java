package com.hock.tour_booking.entities;

import lombok.*;
import jakarta.persistence.*;
import java.util.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "blogs")
public class Blog {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ElementCollection
    @CollectionTable(name = "blog_images", joinColumns = @JoinColumn(name = "blog_id"))
    @Column(name = "image_url")
    private Set<String> images = new HashSet<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors, getters, setters
}
