package com.app.productcatalog.service;

import com.app.productcatalog.model.AppSettings;
import com.app.productcatalog.repository.AppSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppSettingsService {
    private final AppSettingsRepository repository;

    public AppSettings getSettings() {
//        return repository.findById(1L).orElseThrow(() -> new RuntimeException("Settings not found"));
        return repository.findById(1L) .orElseGet(() -> {
            AppSettings settings = new AppSettings();
            settings.setGstPercentage(18);
            settings.setDeliveryFee(49);
            settings.setFreeDeliveryThreshold(499);
            settings.setPlatformFee(10);

            return repository.save(settings);
        });
    }

    public AppSettings updateSettings(AppSettings updated) {
        AppSettings settings = getSettings();
        settings.setGstPercentage(updated.getGstPercentage());
        settings.setDeliveryFee(updated.getDeliveryFee());
        settings.setFreeDeliveryThreshold(updated.getFreeDeliveryThreshold());
        settings.setPlatformFee(updated.getPlatformFee());
        return repository.save(settings);
    }
}