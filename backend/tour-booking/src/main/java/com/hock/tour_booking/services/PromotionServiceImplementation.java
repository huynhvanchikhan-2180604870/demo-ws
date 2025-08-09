package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.PromotionDTO;
import com.hock.tour_booking.entities.Promotion;
import com.hock.tour_booking.repositories.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PromotionServiceImplementation implements PromotionService{
    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public Promotion savePromotion(PromotionDTO promotionDTO) {
        Promotion promotion = new Promotion();
        promotion.setId(UUID.randomUUID());
        promotion.setCode(promotionDTO.getCode());
        promotion.setDescription(promotionDTO.getDescription());
        promotion.setDiscountType(promotionDTO.getDiscountType());
        promotion.setDiscountValue(promotionDTO.getDiscountValue());
        promotion.setStartDate(promotionDTO.getStartDate());
        promotion.setEndDate(promotionDTO.getEndDate());
        promotion.setConditions(promotionDTO.getConditions());
        return promotionRepository.save(promotion);
    }

    @Override
    public List<Promotion> findAllPromotions() {
        return promotionRepository.findAll();
    }

    @Override
    public Promotion findByCode(String code){
        return promotionRepository.findByCode(code);
    }
}
