package com.app.productcatalog.controller;

import com.app.productcatalog.model.AppSettings;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.AppSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AppSettingsController {
    private final AppSettingsService service;

    @GetMapping
    public ApiResponse<AppSettings> getSettings() {
        return new ApiResponse<>(true, "Settings fetched", service.getSettings());
    }

    @PutMapping
    public ApiResponse<AppSettings> updateSettings(@RequestBody AppSettings settings) {
        return new ApiResponse<>(true, "Settings updated", service.updateSettings(settings));
    }
}