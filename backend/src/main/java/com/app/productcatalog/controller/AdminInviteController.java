package com.app.productcatalog.controller;

import com.app.productcatalog.dto.AdminInviteResponseDTO;
import com.app.productcatalog.dto.CompleteAdminSetupDTO;
import com.app.productcatalog.dto.CreateAdminInviteDTO;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.AdminInviteService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/invite")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminInviteController {

    private final AdminInviteService inviteService;

    @PostMapping
    public ApiResponse<String> inviteAdmin(@RequestBody CreateAdminInviteDTO dto){
        return new ApiResponse<>(true, inviteService.inviteAdmin(dto.getEmail()), null);
    }

    @PostMapping("/complete")
    public ApiResponse<String> completeSetup(@RequestBody CompleteAdminSetupDTO dto){
        return new ApiResponse<>(true, inviteService.completeSetup(dto), null);
    }

    @GetMapping
    public ApiResponse<List<AdminInviteResponseDTO>> getInvites(){
        return new ApiResponse<>(true, "Invites fetched", inviteService.getAllInvites());
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteInvite(@PathVariable Long id){
        return new ApiResponse<>(true, inviteService.deleteInvite(id), null);
    }
}