package com.app.productcatalog.repository;

import com.app.productcatalog.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findByEmail(String email);

    @Transactional
    void deleteByEmail(String email);
}