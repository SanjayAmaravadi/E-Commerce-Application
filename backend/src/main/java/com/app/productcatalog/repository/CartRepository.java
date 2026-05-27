package com.app.productcatalog.repository;

import com.app.productcatalog.model.Cart;
import com.app.productcatalog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}