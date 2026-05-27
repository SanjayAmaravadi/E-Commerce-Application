package com.app.productcatalog.dto;

import lombok.Data;

@Data
public class ForgotPasswordRequestDTO {
    private String emailOrPhone;
}