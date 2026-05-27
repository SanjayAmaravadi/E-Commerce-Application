package com.app.productcatalog.dto;

import lombok.Data;

@Data
public class CompleteAdminSetupDTO {
    private String token;
    private String name;
    private String phone;
    private String password;
}