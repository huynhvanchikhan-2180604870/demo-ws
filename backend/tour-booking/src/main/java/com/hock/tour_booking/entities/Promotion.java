package com.hock.tour_booking.entities;
import lombok.*;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "promotions")
public class Promotion {
    @Id
    private UUID id;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "discount_type")
    private String discountType;

    @Column(name = "discount_value")
    private BigDecimal discountValue;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(columnDefinition = "TEXT")
    private String conditions;

    // Constructors, getters, setters
}
