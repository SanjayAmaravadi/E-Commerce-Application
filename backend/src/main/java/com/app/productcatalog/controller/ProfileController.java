package com.app.productcatalog.controller;

import com.app.productcatalog.dto.ProfileResponseDTO;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.app.productcatalog.dto.UpdateProfileDTO;
import com.app.productcatalog.dto.ChangePasswordDTO;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ApiResponse<ProfileResponseDTO> getProfile(){
        return new ApiResponse<>(true, "Profile fetched", profileService.getProfile());
    }

    @PutMapping
    public ApiResponse<String> updateProfile(@RequestBody UpdateProfileDTO dto){
        return new ApiResponse<>(true, profileService.updateProfile(dto), null);
    }

    @PutMapping("/change-password")
    public ApiResponse<String> changePassword(@RequestBody ChangePasswordDTO dto){
        return new ApiResponse<>(true, profileService.changePassword(dto), null);
    }
}