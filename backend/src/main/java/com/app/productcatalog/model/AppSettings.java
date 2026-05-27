package com.app.productcatalog.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class AppSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double gstPercentage;
    private double deliveryFee;
    private double freeDeliveryThreshold;
    private double platformFee;
}