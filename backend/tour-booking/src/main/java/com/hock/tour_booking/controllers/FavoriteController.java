package com.hock.tour_booking.controllers;

import com.hock.tour_booking.dtos.TourDTO;
import com.hock.tour_booking.dtos.mapper.TourDtoMapper;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.services.FavoriteService;
import com.hock.tour_booking.services.TourService;
import com.hock.tour_booking.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/v2/favorites")

public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private UserService userService;
    @Autowired
    private TourService tourService;
    @PostMapping("/add/{tourId}")
    public ResponseEntity<String> addFavorite(@RequestHeader("Authorization") String jwt, @PathVariable UUID tourId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Tour tour = tourService.findTourById(tourId);
        if(user == null || tour == null){
            System.out.println(user.toString());
            throw new Exception("not found");

        }

        favoriteService.addFavorite(user.getId(), tour.getId());
        return ResponseEntity.ok("Tour added to favorites");
    }

    @DeleteMapping("/remove/{tourId}")
    public ResponseEntity<String> removeFavorite(@RequestHeader("Authorization") String jwt, @PathVariable UUID tourId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Tour tour = tourService.findTourById(tourId);
        if(user == null || tour == null){
            throw new Exception("not found");
        }
        favoriteService.removeFavorite(user.getId(), tour.getId());
        return ResponseEntity.ok("Tour removed from favorites");
    }

    @GetMapping
    public ResponseEntity<?> getFavorites(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        if(user == null){
            throw new Exception("not found");
        }
        List<Tour> favorites = favoriteService.getFavorites(user.getId()).stream().toList();
        List<TourDTO> dtos = TourDtoMapper.tourDTOs(favorites);
        
        return  new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
