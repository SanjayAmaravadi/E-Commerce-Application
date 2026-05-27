package com.app.productcatalog.repository;

import com.app.productcatalog.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
    Page<Product> findByCategoryIdAndNameContainingIgnoreCase(Long categoryId, String keyword,Pageable pageable);
    Page<Product> findByActiveTrue(Pageable pageable);
    Page<Product> findByActiveTrueAndCategoryId(Long categoryId, Pageable pageable);
    Page<Product> findByActiveTrueAndNameContainingIgnoreCase(String search, Pageable pageable);
    Page<Product> findByActiveTrueAndCategoryIdAndNameContainingIgnoreCase(Long categoryId, String keyword, Pageable pageable);
}