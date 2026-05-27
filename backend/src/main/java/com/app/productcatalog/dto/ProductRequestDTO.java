//package com.app.productcatalog.dto;
//
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import lombok.Data;
//
//@Data
//public class ProductRequestDTO {
//
//    @NotBlank(message = "Product name is required")
//    private String name;
//
//    @NotBlank(message = "Description is required")
//    private String description;
//
//    @NotNull(message = "Price is required")
//    private Double price;
//
//    @NotNull(message = "Quantity is required")
//    private Integer quantity;
//
//    @NotNull(message = "Category is required")
//    private Long categoryId;
//
//    // IMAGE
//    private String imageUrl;
//    private Double scale;
//    private Integer positionX;
//    private Integer positionY;
//}

package com.app.productcatalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductRequestDTO {

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    private String imageUrl;

    @NotNull(message = "Price is required")
    private Double price;

    @NotNull(message = "Price is required")
    private Integer quantity;

    @NotNull(message = "Category is required")
    private Long categoryId;
}