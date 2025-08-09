package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.Tour;

import java.util.Set;
import java.util.UUID;

public interface FavoriteService {
    public void addFavorite(UUID userId, UUID tourId);
    public void removeFavorite(UUID userId, UUID tourId);
    public Set<Tour> getFavorites(UUID userId);
}
