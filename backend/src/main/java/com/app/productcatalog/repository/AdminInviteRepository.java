package com.app.productcatalog.repository;

import com.app.productcatalog.model.AdminInvite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminInviteRepository extends JpaRepository<AdminInvite, Long> {
    Optional<AdminInvite> findByToken(String token);
    boolean existsByEmailAndUsedFalse(String email);
    void deleteById(Long id);
}