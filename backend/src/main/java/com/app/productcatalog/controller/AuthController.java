package com.app.productcatalog.controller;

import com.app.productcatalog.dto.*;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponseDTO register(@Valid @RequestBody RegisterRequestDTO dto){
        String response = authService.register(dto);
        return new AuthResponseDTO(true, response);
    }

    @PostMapping("/verify-otp")
    public AuthResponseDTO verifyOtp(@RequestBody VerifyOtpDTO dto){
        String response = authService.verifyOtp(dto);
        return new AuthResponseDTO(true, response);
    }

    @PostMapping("/resend-otp")
    public AuthResponseDTO resendOtp(@RequestParam String email){
        String response = authService.resendOtp(email);
        return new AuthResponseDTO(true, response);
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@RequestBody LoginRequest request){
        return new ApiResponse<>(true, "Login successful", authService.login(request)
        );
    }

    @PostMapping("/forgot-password")
    public AuthResponseDTO forgotPassword(@RequestBody ForgotPasswordRequestDTO dto){
        String response = authService.forgotPassword(dto);
        return new AuthResponseDTO(true, response);
    }

    @PostMapping("/reset-password")
    public AuthResponseDTO resetPassword(@RequestBody ResetPasswordDTO dto){
        String response = authService.resetPassword(dto);
        return new AuthResponseDTO(true, response);
    }
}