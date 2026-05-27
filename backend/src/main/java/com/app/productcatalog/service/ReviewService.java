package com.app.productcatalog.service;

import com.app.productcatalog.dto.ReviewRequest;
import com.app.productcatalog.model.*;
import com.app.productcatalog.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // ADD REVIEW
    public Review addReview(ReviewRequest request){

        Product product = productRepository
                .findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        Review review = new Review();

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());
        review.setProduct(product);
        review.setUser(user);
        return reviewRepository.save(review);
    }

    // GET PRODUCT REVIEWS
    public List<Review> getReviewsByProduct(Long productId){
        Product product = productRepository
                .findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return reviewRepository.findByProduct(product);
    }
}