package com.app.productcatalog.controller;

import com.app.productcatalog.dto.CreatePaymentOrderDTO;
import com.app.productcatalog.dto.PaymentOrderResponseDTO;
import com.app.productcatalog.dto.VerifyPaymentDTO;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

//import com.app.productcatalog.model.Order;
//import com.app.productcatalog.repository.OrderRepository;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final PaymentService paymentService;
//    private final OrderRepository orderRepository;

//    @PostMapping("/create-checkout-session")
//    public ApiResponse<String> createCheckoutSession(@RequestBody CreatePaymentOrderDTO dto) throws Exception {
//        Order order = orderRepository.findById(dto.getOrderId()).orElseThrow();
//        String sessionId = paymentService.createCheckoutSession(order);
//        return new ApiResponse<>(true, "Session Created", sessionId);
//    }

    @PostMapping("/create-order")
    public ApiResponse<PaymentOrderResponseDTO> createOrder(@RequestBody CreatePaymentOrderDTO dto) throws Exception {
        return new ApiResponse<>(true, "Payment order created", paymentService.createPaymentOrder(dto.getOrderId()));
    }

    @PostMapping("/verify")
    public ApiResponse<String>
    verifyPayment(@RequestBody VerifyPaymentDTO dto) throws Exception {
        return new ApiResponse<>(true, paymentService.verifyPayment(dto), null);
    }
}