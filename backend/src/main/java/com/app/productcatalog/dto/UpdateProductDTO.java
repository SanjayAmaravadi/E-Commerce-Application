//package com.app.productcatalog.dto;
//
//import lombok.Data;
//
//@Data
//public class UpdateProductDTO {
//    private String name;
//    private String description;
//    private Double price;
//    private Integer quantity;
//    private Long categoryId;
//
//    // IMAGE
//    private String imageUrl;
//    private Double scale;
//    private Integer positionX;
//    private Integer positionY;
//}

package com.app.productcatalog.dto;

import lombok.Data;

@Data
public class UpdateProductDTO {
    private String name;
    private String description;
    private String imageUrl;
    private Double price;
    private Long categoryId;
    private Integer quantity;
}