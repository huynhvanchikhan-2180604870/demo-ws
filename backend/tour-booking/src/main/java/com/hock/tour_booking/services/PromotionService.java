package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.PromotionDTO;
import com.hock.tour_booking.entities.Promotion;

import java.util.List;

public interface PromotionService {
    public Promotion savePromotion(PromotionDTO promotionDTO);
    public List<Promotion> findAllPromotions();
    public Promotion findByCode(String code);
}
