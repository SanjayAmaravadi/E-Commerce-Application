package com.app.productcatalog.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private Boolean verified;

    // USER STATS
    private Long totalOrders;
    private Long wishlistItems;
    private Long cartItems;
}