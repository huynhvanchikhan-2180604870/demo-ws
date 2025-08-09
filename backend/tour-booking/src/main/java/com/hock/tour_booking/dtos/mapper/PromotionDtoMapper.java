package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.PromotionDTO;
import com.hock.tour_booking.entities.Promotion;

import java.util.ArrayList;
import java.util.List;

public class PromotionDtoMapper {
    public static PromotionDTO toPromotionDto(Promotion promotion){
        PromotionDTO dto = new PromotionDTO();
        dto.setId(promotion.getId());
        dto.setCode(promotion.getCode());
        dto.setDescription(promotion.getDescription());
        dto.setDiscountType(promotion.getDiscountType());
        dto.setDiscountValue(promotion.getDiscountValue());
        dto.setStartDate(promotion.getStartDate());
        dto.setEndDate(promotion.getEndDate());
        dto.setConditions(promotion.getConditions());
        return dto;
    }

    public static List<PromotionDTO> toPromotionDtos(List<Promotion> promotions){
        List<PromotionDTO> dtos = new ArrayList<>();
        for (Promotion promotion : promotions){
            PromotionDTO conver = toPromotionDto(promotion);
            dtos.add(conver);
        }
        return dtos;
    }
}
