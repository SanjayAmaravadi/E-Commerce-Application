package com.app.productcatalog.dto;

import lombok.Data;

@Data
public class UpdateProfileDTO {
    private String name;
    private String email;
    private String phone;
}