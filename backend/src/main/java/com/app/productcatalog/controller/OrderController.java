package com.app.productcatalog.controller;

import com.app.productcatalog.model.Order;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.app.productcatalog.model.OrderStatus;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/my-orders")
    public ApiResponse<List<Order>> getMyOrders(){
        return new ApiResponse<>(true, "Orders fetched successfully", orderService.getMyOrders());
    }

    @PostMapping("/checkout")
    public ApiResponse<Order> checkout(@RequestParam(defaultValue = "ONLINE") String paymentMethod){
        return new ApiResponse<>(true, "Order created successfully", orderService.placeOrder(paymentMethod));
    }

    @GetMapping("/admin/all")
    public ApiResponse<List<Order>> getAllOrders(){
        return new ApiResponse<>(true, "All orders fetched", orderService.getAllOrders());
    }

    @PutMapping("/admin/{orderId}/status")
    public ApiResponse<Order> updateStatus(@PathVariable Long orderId, @RequestParam OrderStatus status){
        return new ApiResponse<>(true, "Order status updated", orderService.updateOrderStatus(orderId, status));
    }
}