package com.app.productcatalog.dto;

import lombok.Data;

@Data
public class ResetPasswordDTO {
    private String emailOrPhone;
    private String otp;
    private String newPassword;
}