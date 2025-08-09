package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.CategoryDTO;
import com.hock.tour_booking.dtos.mapper.CategoryDtoMapper;
import com.hock.tour_booking.entities.Category;
import com.hock.tour_booking.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CategoryServiceImplementation implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<CategoryDTO> findAllCategories() {
        List<CategoryDTO> categories = new ArrayList<>();
        for (Category category : categoryRepository.findAll()) {
            CategoryDTO categoryDTO = CategoryDtoMapper.toCategoryDTO(category);
            categories.add(categoryDTO);
        }
        return categories;
    }

    @Override
    public CategoryDTO findCategoryById(UUID id) {
        CategoryDTO categoryDTO = CategoryDtoMapper.toCategoryDTO(categoryRepository.findById(id).get());
        return categoryDTO;
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setId(UUID.randomUUID());
        Category savedCategory = categoryRepository.save(category);
        return CategoryDtoMapper.toCategoryDTO(savedCategory);
    }

    @Override
    public Category findById(UUID id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public void deleteCategory(UUID id){
        Category category = findById(id);
        categoryRepository.delete(category);
    }
}
