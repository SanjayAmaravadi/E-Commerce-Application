package com.app.productcatalog.service;

import com.app.productcatalog.dto.PaymentOrderResponseDTO;
import com.app.productcatalog.dto.VerifyPaymentDTO;
import com.app.productcatalog.model.*;
import com.app.productcatalog.repository.OrderRepository;
import com.app.productcatalog.repository.ProductRepository;
import com.razorpay.RazorpayClient;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

//import com.stripe.model.checkout.Session;
//import com.stripe.param.checkout.SessionCreateParams;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    @Value("${razorpay.key.id}")
    private String razorpayKey;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

//    public String createCheckoutSession(Order order) throws Exception {
//        SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
//                        .setName("Product Order")
//                        .build();
//
//        SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
//                        .setCurrency("inr")
//                        .setUnitAmount((long)(order.getTotalAmount() * 100))
//                        .setProductData(productData)
//                        .build();
//
//        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
//                        .setQuantity(1L)
//                        .setPriceData(priceData)
//                        .build();
//
//        SessionCreateParams params = SessionCreateParams.builder()
//                        .setMode(SessionCreateParams.Mode.PAYMENT)
//                        .setSuccessUrl("http://localhost:5173/payment-success?orderId=" + order.getId())
//                        .setCancelUrl("http://localhost:5173/payment-cancel")
//                        .addLineItem(lineItem)
//                        .build();
//
//        Session session = Session.create(params);
//        return session.getId();
//    }

    // CREATE PAYMENT ORDER
    public PaymentOrderResponseDTO createPaymentOrder(Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new RuntimeException("Order not found"));

        JSONObject options = new JSONObject();

        // RAZORPAY USES PAISE
        double finalAmount = order.getTotalAmount();
        options.put("amount",(int) Math.round(finalAmount * 100));
        options.put("currency", "INR");
        options.put("receipt", "receipt_" + orderId);

        com.razorpay.Order razorpayOrder = razorpayClient.orders.create(options);

        order.setRazorpayOrderId(razorpayOrder.get("id"));
        order.setPaymentStatus(PaymentStatus.PENDING);

        orderRepository.save(order);

        return PaymentOrderResponseDTO
                .builder()
                .razorpayOrderId(razorpayOrder.get("id"))
                .currency(razorpayOrder.get("currency"))
                .amount(razorpayOrder.get("amount"))
                .key(razorpayKey)
                .build();
    }

    // VERIFY PAYMENT
    @Transactional
    public String verifyPayment(VerifyPaymentDTO dto) throws Exception {
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        String generatedSignature = generateSignature(dto.getRazorpayOrderId() + "|" + dto.getRazorpayPaymentId());

        // VERIFY SIGNATURE
        if(!generatedSignature.equals(dto.getRazorpaySignature())){
            order.setPaymentStatus(PaymentStatus.FAILED);
            orderRepository.save(order);
            throw new RuntimeException("Payment verification failed");
        }

        // SUCCESS
        order.setPaymentId(dto.getRazorpayPaymentId());
        order.setRazorpaySignature(dto.getRazorpaySignature());
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setPaymentStatus(PaymentStatus.PAID);
        order.setStatus(OrderStatus.PENDING);

        // REDUCE STOCK
        for(OrderItem item : order.getItems()){
            Product product = item.getProduct();
            if(product.getQuantity() < item.getQuantity())
                throw new RuntimeException(product.getName() + " stock unavailable");

            product.setQuantity(product.getQuantity() - item.getQuantity());
            productRepository.save(product);
        }

        // CLEAR CART
        Cart cart = cartService.getUserCart();
        cart.getItems().clear();
        cartService.saveCart(cart);
        orderRepository.save(order);
        return "Payment successful";
    }

    // GENERATE SIGNATURE
    private String generateSignature(String data) throws Exception {
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(razorpaySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256Hmac.init(secretKey);
        byte[] hash = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder result = new StringBuilder();
        for(byte b : hash)
            result.append(String.format("%02x", b));

        return result.toString();
    }
}