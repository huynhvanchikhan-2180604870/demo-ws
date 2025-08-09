package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.CategoryDTO;
import com.hock.tour_booking.entities.Category;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    public List<CategoryDTO> findAllCategories();
    public CategoryDTO findCategoryById(UUID id);
    public CategoryDTO createCategory(CategoryDTO categoryDTO);
    public Category findById(UUID id);
    public void deleteCategory(UUID id);
}
