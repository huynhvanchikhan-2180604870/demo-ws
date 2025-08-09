package com.hock.tour_booking.repositories;

import com.hock.tour_booking.dtos.TourDTO;
import com.hock.tour_booking.entities.Category;
import com.hock.tour_booking.entities.Destination;
import com.hock.tour_booking.entities.Tour;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TourCustomRepo {
        public static Specification<Tour> search(String destination, LocalDate departureDate, UUID category) {
            return (root, query, criteriaBuilder) -> {
                List<Predicate> predicates = new ArrayList<>();
                if (destination != null && !destination.isEmpty()) {
                    Join<Tour, Destination> destinationJoin = root.join("destination");
//                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("destination")), "%" + destination.toLowerCase() + "%"));
                    predicates.add(criteriaBuilder.equal(destinationJoin.get("name"), destination));
                }
                if (departureDate != null) {
                    predicates.add(criteriaBuilder.equal(root.get("departureDate"), departureDate));
                }
                if (category != null) {
                    Join<Tour, Category> categoryJoin = root.join("category");  // Perform a join to access the Category
                    predicates.add(criteriaBuilder.equal(categoryJoin.get("id"), category));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            };
        }

    public static Specification<Tour> byHostIdAndSearch(UUID hostId, String name) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (hostId != null) {
                predicates.add(criteriaBuilder.equal(root.get("host").get("id"), hostId));
            }
            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + name + "%"));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
