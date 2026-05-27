package com.app.productcatalog.service;

import com.app.productcatalog.model.Otp;
import com.app.productcatalog.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;

    public String generateOtp(){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Transactional
    public void saveOtp(String email, String otp){
        otpRepository.deleteByEmail(email);
        Otp otpEntity = new Otp();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otpEntity);
    }

    public boolean verifyOtp(String email, String otp){

        Otp otpEntity = otpRepository.findByEmail(email).orElse(null);

        if(otpEntity == null)
            return false;

        if(LocalDateTime.now().isAfter(otpEntity.getExpiryTime()))
            return false;

        return otpEntity.getOtp().equals(otp);
    }

    @Transactional
    public void deleteOtp(String email){
        otpRepository.deleteByEmail(email);
    }
}