package com.app.productcatalog.service;

import com.app.productcatalog.dto.ChangePasswordDTO;
import com.app.productcatalog.dto.ProfileResponseDTO;
import com.app.productcatalog.dto.UpdateProfileDTO;
import com.app.productcatalog.model.User;
import com.app.productcatalog.repository.CartItemRepository;
import com.app.productcatalog.repository.OrderRepository;
import com.app.productcatalog.repository.UserRepository;
import com.app.productcatalog.repository.WishlistRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final WishlistRepository wishlistRepository;
    private final CartItemRepository cartItemRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileResponseDTO getProfile(){

        String email = SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long totalOrders = orderRepository.countByUserId(user.getId());
        long wishlistItems = wishlistRepository.countByUserId(user.getId());
        long cartItems = cartItemRepository.countByCartUserId(user.getId());

        return ProfileResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .verified(user.getVerified())
                .totalOrders(totalOrders)
                .wishlistItems(wishlistItems)
                .cartItems(cartItems)
                .build();
    }

    public String updateProfile(UpdateProfileDTO dto){
        String email = SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getEmail().equals(dto.getEmail()) && userRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Email already exists");

        if(!user.getPhone().equals(dto.getPhone()) && userRepository.existsByPhone(dto.getPhone()))
            throw new RuntimeException("Phone already exists");

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        userRepository.save(user);

        return "Profile updated successfully";
    }

    public String changePassword(ChangePasswordDTO dto){
        String email = SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword()))
            throw new RuntimeException("Current password incorrect");

        if(passwordEncoder.matches(dto.getNewPassword(), user.getPassword()))
            throw new RuntimeException("New password cannot be same");


        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        return "Password updated successfully";
    }


}