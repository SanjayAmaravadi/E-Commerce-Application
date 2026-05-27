//package com.app.productcatalog.dto;
//
//import lombok.Builder;
//import lombok.Data;
//
//import java.util.List;
//
//@Data
//@Builder
//public class ProductResponseDTO {
//    private Long id;
//    private String name;
//    private String description;
//    private Double price;
//    private Integer quantity;
//    private Long categoryId;
//    private String categoryName;
//    private Double averageRating;
//    private Integer reviewCount;
//
//    // IMAGES
//    private List<ProductImageDTO> images;
//}

package com.app.productcatalog.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private Double price;
    private Integer quantity;
    private Long categoryId;
    private String categoryName;
    private Double averageRating;
    private Integer reviewCount;
}