package com.app.productcatalog.repository;

import com.app.productcatalog.model.Order;
import com.app.productcatalog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findAllByOrderByCreatedAtDesc();
    long countByUserId(Long userId);
}