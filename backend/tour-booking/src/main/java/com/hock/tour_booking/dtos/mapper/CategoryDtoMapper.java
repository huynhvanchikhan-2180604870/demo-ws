package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.CategoryDTO;
import com.hock.tour_booking.entities.Category;

import java.util.ArrayList;
import java.util.List;

public class CategoryDtoMapper {
    public static CategoryDTO toCategoryDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        return categoryDTO;
    }

    public static List<CategoryDTO> toCategoryDTOs(List<Category> categories) {
        List<CategoryDTO> categoryDTOs = new ArrayList<>();
        for (Category category : categories) {
            CategoryDTO categoryDTO = toCategoryDTO(category);
            categoryDTOs.add(categoryDTO);
        }
        return categoryDTOs;
    }
}
