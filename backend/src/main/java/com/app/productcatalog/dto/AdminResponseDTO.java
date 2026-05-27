package com.app.productcatalog.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private Boolean verified;
}