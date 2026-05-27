package com.app.productcatalog.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductImageDTO {
    private Long id;
    private String imageUrl;
    private Double scale;
    private Integer positionX;
    private Integer positionY;
    private Boolean primaryImage;
}