package com.app.productcatalog.service;

import com.app.productcatalog.dto.AdminResponseDTO;
import com.app.productcatalog.dto.CreateAdminDTO;
import com.app.productcatalog.model.Role;
import com.app.productcatalog.model.User;
import com.app.productcatalog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminManagementService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${super.admin.email}")
    private String superAdminEmail;

    public List<AdminResponseDTO> getAdmins(){
        List<User> admins = userRepository.findByRoleIn(
                        List.of(Role.ROLE_ADMIN,
                                Role.ROLE_SUPER_ADMIN
                        ));

        return admins.stream()
                .map(this::mapToDTO)
                .toList();
    }

    public String removeAdmin(Long id){
        User admin = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));

        if(admin.getRole() == Role.ROLE_SUPER_ADMIN)
            throw new RuntimeException("Cannot remove super admin");

        userRepository.delete(admin);
        return "Admin removed successfully";
    }

    public String promoteToSuperAdmin(Long id){
        User admin = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));

        if(admin.getRole() != Role.ROLE_ADMIN)
            throw new RuntimeException("Only admins can be promoted");

        admin.setRole(Role.ROLE_SUPER_ADMIN);
        userRepository.save(admin);
        return "Promoted successfully";
    }

    private AdminResponseDTO mapToDTO(User user){

        return AdminResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .verified(user.getVerified())
                .build();
    }

    public String demoteSuperAdmin(Long id){
        User admin = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));

        if(admin.getRole() != Role.ROLE_SUPER_ADMIN)
            throw new RuntimeException("User is not super admin");

        if(admin.getEmail().equals(superAdminEmail))
            throw new RuntimeException("Main super admin cannot be demoted");

        admin.setRole(Role.ROLE_ADMIN);
        userRepository.save(admin);
        return "Demoted successfully";
    }
    /*
    CREATE ADMIN
*/

    public String createAdmin(CreateAdminDTO dto){
        if(userRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Email already exists");

        if(userRepository.existsByPhone(dto.getPhone()))
            throw new RuntimeException("Phone already exists");

        User admin = new User();
        admin.setName(dto.getName());
        admin.setEmail(dto.getEmail());
        admin.setPhone(dto.getPhone());
        admin.setPassword(
                passwordEncoder.encode(
                        dto.getPassword()
                )
        );
        admin.setRole(Role.ROLE_ADMIN);
        admin.setVerified(true);
        userRepository.save(admin);
        return "Admin created successfully";
    }
}