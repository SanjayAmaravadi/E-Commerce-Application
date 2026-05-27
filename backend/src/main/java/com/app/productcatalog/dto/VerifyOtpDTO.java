package com.app.productcatalog.dto;

import lombok.Data;

@Data
public class VerifyOtpDTO {
    private String email;
    private String otp;
}