package com.app.productcatalog.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentOrderResponseDTO {
    private String razorpayOrderId;
    private String currency;
    private Integer amount;
    private String key;
}