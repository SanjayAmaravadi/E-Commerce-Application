package com.app.productcatalog.dto;

import lombok.Data;

@Data
public class CreateAdminDTO {
    private String name;
    private String email;
    private String phone;
    private String password;
}