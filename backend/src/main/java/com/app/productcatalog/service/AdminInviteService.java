package com.app.productcatalog.service;

import com.app.productcatalog.dto.AdminInviteResponseDTO;
import com.app.productcatalog.dto.CompleteAdminSetupDTO;
import com.app.productcatalog.model.AdminInvite;
import com.app.productcatalog.model.Role;
import com.app.productcatalog.model.User;
import com.app.productcatalog.repository.AdminInviteRepository;
import com.app.productcatalog.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminInviteService {

    private final AdminInviteRepository inviteRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    /*
        CREATE INVITE
    */

    public String inviteAdmin(String email){

        if(userRepository.existsByEmail(email))
            throw new RuntimeException(
                    "Email already exists"
            );

        if(inviteRepository.existsByEmailAndUsedFalse(email))
            throw new RuntimeException(
                    "Pending invite already exists"
            );

        String token =
                UUID.randomUUID().toString();

        AdminInvite invite =
                new AdminInvite();

        invite.setEmail(email);

        invite.setToken(token);

        invite.setUsed(false);

        invite.setExpiryTime(
                LocalDateTime.now().plusDays(1)
        );

        inviteRepository.save(invite);

        String inviteLink =
                "http://localhost:5173/admin/setup/"
                        + token;

        emailService.sendAdminInviteEmail(
                email,
                inviteLink
        );

        return "Admin invite sent successfully";
    }

    /*
        COMPLETE SETUP
    */

    public String completeSetup(CompleteAdminSetupDTO dto){

        if(userRepository.existsByPhone(dto.getPhone()))
            throw new RuntimeException("Phone already exists");

        AdminInvite invite = inviteRepository.findByToken(dto.getToken()).orElseThrow(() -> new RuntimeException("Invalid invite token"));


        if(invite.getUsed())
            throw new RuntimeException("Invite already used");

        if(LocalDateTime.now().isAfter(invite.getExpiryTime()))
            throw new RuntimeException("Invite expired");

        User admin = new User();
        admin.setName(dto.getName());
        admin.setPhone(dto.getPhone());
        admin.setEmail(invite.getEmail());
        admin.setPassword(passwordEncoder.encode(dto.getPassword()));
        admin.setRole(Role.ROLE_ADMIN);
        admin.setVerified(true);
        userRepository.save(admin);
        invite.setUsed(true);
        inviteRepository.save(invite);
        return "Admin account created successfully";
    }

    /*
    GET ALL INVITES
*/

    public List<AdminInviteResponseDTO> getAllInvites(){

        return inviteRepository
                .findAll()
                .stream()
                .map(invite -> {
                    String status;
                    if(Boolean.TRUE.equals(invite.getUsed()))
                        status = "USED";
                    else if(LocalDateTime.now().isAfter(invite.getExpiryTime()))
                        status = "EXPIRED";
                    else
                        status = "PENDING";

                    return AdminInviteResponseDTO
                            .builder()
                            .id(invite.getId())
                            .email(invite.getEmail())
                            .status(status)
                            .expiryTime(invite.getExpiryTime().toString())
                            .build();
                }).toList();
    }

    public String deleteInvite(Long id){
        AdminInvite invite = inviteRepository
                        .findById(id)
                        .orElseThrow(() -> new RuntimeException("Invite not found"));

        if(Boolean.TRUE.equals(invite.getUsed()))
            throw new RuntimeException("Used invite cannot be deleted");

        inviteRepository.delete(invite);
        return "Invite cancelled successfully";
    }
}