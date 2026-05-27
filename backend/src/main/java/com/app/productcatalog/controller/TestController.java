package com.app.productcatalog.controller;

import com.app.productcatalog.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

    private final EmailService emailService;

    @GetMapping("/mail")
    public String testMail(){

        emailService.sendOtpEmail(
                "sanjayamaravadi5@gmail.com",
                "123456"
        );

        return "Mail Sent";
    }
}