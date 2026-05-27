package com.app.productcatalog.controller;

import com.app.productcatalog.dto.AdminResponseDTO;
import com.app.productcatalog.dto.CreateAdminDTO;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.AdminManagementService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/super-admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminManagementController {

    private final AdminManagementService service;

    @GetMapping("/admins")
    public ApiResponse<List<AdminResponseDTO>> getAdmins(){
        return new ApiResponse<>(true, "Admins fetched", service.getAdmins());
    }

    @DeleteMapping("/admins/{id}")
    public ApiResponse<String> removeAdmin(@PathVariable Long id){
        return new ApiResponse<>(true, service.removeAdmin(id), null);
    }

    @PutMapping("/admins/promote/{id}")
    public ApiResponse<String> promoteAdmin(@PathVariable Long id){
        return new ApiResponse<>(true, service.promoteToSuperAdmin(id), null);
    }

    @PutMapping("/admins/demote/{id}")
    public ApiResponse<String> demoteAdmin(@PathVariable Long id){
        return new ApiResponse<>(true, service.demoteSuperAdmin(id), null);
    }

    @PostMapping("/admins")
    public ApiResponse<String> createAdmin(@RequestBody CreateAdminDTO dto){
        return new ApiResponse<>(true, service.createAdmin(dto), null);
    }
}