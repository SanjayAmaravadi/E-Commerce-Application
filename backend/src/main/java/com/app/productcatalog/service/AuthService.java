package com.app.productcatalog.service;

import com.app.productcatalog.dto.*;
import com.app.productcatalog.jwt.JwtUtil;
import com.app.productcatalog.model.Role;
import com.app.productcatalog.model.User;
import com.app.productcatalog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.*;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OtpService otpService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequestDTO dto){

        if(userRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Email already registered");

        if(userRepository.existsByPhone(dto.getPhone()))
            throw new RuntimeException("Phone number already registered");

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Role.ROLE_USER);
        user.setVerified(false);
        userRepository.save(user);

        String otp = otpService.generateOtp();
        otpService.saveOtp(dto.getEmail(), otp);

        emailService.sendOtpEmail(dto.getEmail(), otp);
        return "OTP sent successfully";
    }

    public String verifyOtp(VerifyOtpDTO dto){
        boolean valid = otpService.verifyOtp(dto.getEmail(), dto.getOtp());

        if(!valid) throw new RuntimeException("Invalid OTP");

        User user = userRepository
                        .findByEmail(dto.getEmail())
                        .orElseThrow(() -> new RuntimeException("User not found"));

        user.setVerified(true);
        userRepository.save(user);
        otpService.deleteOtp(dto.getEmail());
        return "Account verified successfully";
    }

    public String resendOtp(String email){
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String otp = otpService.generateOtp();
        otpService.saveOtp(email, otp);
        emailService.sendOtpEmail(email, otp);

        return "OTP resent successfully";
    }

    public AuthResponse login(LoginRequest request){

        User user = userRepository
                .findByEmailOrPhone(
                        request.getEmailOrPhone(),
                        request.getEmailOrPhone()
                )
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // CHECK VERIFIED
        if(Boolean.FALSE.equals(user.getVerified()))
            throw new RuntimeException("Please verify your email first");

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid password");

        // AUTHENTICATE
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), request.getPassword()));

        // GENERATE TOKEN
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(
                token,
                user.getRole().name(),
                user.getEmail(),
                user.getName(),
                user.getId()
        );
    }

    public String forgotPassword(ForgotPasswordRequestDTO dto){
        User user = userRepository
                .findByEmailOrPhone(
                        dto.getEmailOrPhone(),
                        dto.getEmailOrPhone()
                )
                .orElseThrow(() -> new RuntimeException("User not found"));

        // GENERATE OTP
        String otp = otpService.generateOtp();
        otpService.saveOtp(user.getEmail(), otp);

        // SEND EMAIL
        emailService.sendOtpEmail(user.getEmail(), otp);

        return "Reset OTP sent successfully";
    }

    public String resetPassword(ResetPasswordDTO dto){

        User user = userRepository
                .findByEmailOrPhone(
                        dto.getEmailOrPhone(),
                        dto.getEmailOrPhone()
                )
                .orElseThrow(() -> new RuntimeException("User not found"));

        // VERIFY OTP
        boolean valid = otpService.verifyOtp(
                            user.getEmail(),
                            dto.getOtp()
                         );

        if(!valid)
            throw new RuntimeException("Invalid OTP");

        // UPDATE PASSWORD
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        // DELETE OTP
        otpService.deleteOtp(user.getEmail());

        return "Password reset successful";
    }
}