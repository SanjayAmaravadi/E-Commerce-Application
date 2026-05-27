package com.app.productcatalog.controller;

import com.app.productcatalog.dto.ReviewRequest;
import com.app.productcatalog.model.Review;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;

    // ADD REVIEW
    @PostMapping
    public ApiResponse<Review> addReview(@Valid @RequestBody ReviewRequest request){
        return new ApiResponse<>(true, "Review added successfully", reviewService.addReview(request));
    }

    // GET REVIEWS
    @GetMapping("/{productId}")
    public ApiResponse<List<Review>> getReviews(@PathVariable Long productId){
        return new ApiResponse<>(true, "Reviews fetched successfully", reviewService.getReviewsByProduct(productId));
    }
}