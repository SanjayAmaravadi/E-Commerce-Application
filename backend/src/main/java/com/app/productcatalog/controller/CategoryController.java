package com.app.productcatalog.controller;

import com.app.productcatalog.model.Category;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<Category>> getAllCategories(){
        return new ApiResponse<>(true, "Categories fetched successfully", categoryService.getAllCategories());
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category){
        return categoryService.createCategory(category);
    }
}