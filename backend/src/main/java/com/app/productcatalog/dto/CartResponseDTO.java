package com.app.productcatalog.dto;

import com.app.productcatalog.model.CartItem;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDTO {
    private List<CartItem> items;
    private double subtotal;
    private double gst;
    private double deliveryFee;
    private double platformFee;
    private double totalAmount;
}