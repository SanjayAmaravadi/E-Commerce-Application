package com.app.productcatalog.repository;

import com.app.productcatalog.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    long countByCartUserId(Long userId);
}