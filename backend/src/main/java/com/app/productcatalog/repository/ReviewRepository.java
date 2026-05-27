package com.app.productcatalog.repository;

import com.app.productcatalog.model.Product;
import com.app.productcatalog.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct(Product product);
}