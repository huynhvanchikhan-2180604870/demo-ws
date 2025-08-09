package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.repositories.TourRepository;
import com.hock.tour_booking.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImplementation implements FavoriteService{
    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    @Override
    public void addFavorite(UUID userId, UUID tourId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        user.getFavoriteTours().add(tour);
        userRepository.save(user);
    }

    @Override
    public void removeFavorite(UUID userId, UUID tourId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        user.getFavoriteTours().remove(tour);
        userRepository.save(user);
    }

    @Override
    public Set<Tour> getFavorites(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getFavoriteTours();
    }
}
