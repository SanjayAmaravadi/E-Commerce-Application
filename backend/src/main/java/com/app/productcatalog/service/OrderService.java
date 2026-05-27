package com.app.productcatalog.service;

import com.app.productcatalog.model.*;
import com.app.productcatalog.repository.AppSettingsRepository;
import com.app.productcatalog.repository.OrderRepository;
import com.app.productcatalog.repository.ProductRepository;
import com.app.productcatalog.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final CartService cartService;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final AppSettingsRepository appSettingsRepository;

    // PLACE ORDER
    @Transactional
    public Order placeOrder(String paymentMethod){
        Cart cart = cartService.getUserCart();

        if(cart.getItems().isEmpty())
            throw new RuntimeException("Cart is empty");

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(java.time.LocalDateTime.now());

        // PAYMENT TYPE
        if(paymentMethod.equals("ONLINE")){
            order.setStatus(OrderStatus.PENDING_PAYMENT);
            order.setPaymentStatus(PaymentStatus.PENDING);
        } else {
            order.setStatus(OrderStatus.PENDING);
            order.setPaymentStatus(PaymentStatus.PAID);
        }

        // ORDER ITEMS
        double subtotal = 0;
        for(CartItem cartItem : cart.getItems()){
            Product product = cartItem.getProduct();

            // STOCK CHECK
            if(product.getQuantity() < cartItem.getQuantity())
                throw new RuntimeException(product.getName() + " stock not available");

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);
            subtotal += cartItem.getQuantity() * product.getPrice();
            order.getItems().add(orderItem);
        }

        // CALCULATIONS
        AppSettings settings = appSettingsRepository.findById(1L)
                        .orElseThrow(() -> new RuntimeException("Settings not found"));

        double gst = subtotal * (settings.getGstPercentage() / 100);
        double deliveryFee = subtotal > settings.getFreeDeliveryThreshold() ? 0 : settings.getDeliveryFee();
        double platformFee = settings.getPlatformFee();

//        double gst = subtotal * 0.18;
//        double deliveryFee = subtotal > 499 ? 0 : 49;
//        double platformFee = 10;

        double finalAmount = subtotal + gst + deliveryFee + platformFee;

        order.setSubtotal(subtotal);
        order.setGst(gst);
        order.setDeliveryFee(deliveryFee);
        order.setPlatformFee(platformFee);
        order.setTotalAmount(finalAmount);
        Order savedOrder = orderRepository.save(order);

        // COD FLOW
        if(paymentMethod.equals("COD")){

            // REDUCE STOCK
            for(OrderItem item : order.getItems()){
                Product product = item.getProduct();
                product.setQuantity(product.getQuantity() - item.getQuantity());
                productRepository.save(product);
            }

            // CLEAR CART
            cart.getItems().clear();
            cartService.saveCart(cart);
        }
        return savedOrder;
    }

    // MY ORDERS
    public List<Order> getMyOrders(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return orderRepository.findByUser(user);
    }

    // ADMIN ORDERS
    public List<Order> getAllOrders(){
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    // UPDATE STATUS
    public Order updateOrderStatus(Long orderId, OrderStatus status){
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepository.save(order);
    }
}