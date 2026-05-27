package com.app.productcatalog.dto;

import lombok.Data;

@Data
public class VerifyPaymentDTO {
    private Long orderId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private String paymentMethod;
}