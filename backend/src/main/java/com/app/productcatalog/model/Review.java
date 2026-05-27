package com.app.productcatalog.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rating;

    @Column(length = 1000)
    private String comment;

    private LocalDateTime createdAt;

    @ManyToOne
    @JsonIgnoreProperties({
            "products"
    })
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties({
            "password",
            "cart",
            "wishlist",
            "orders"
    })
    private User user;
}

//package com.app.productcatalog.model;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//import java.time.LocalDateTime;
//
//@Entity
//@Getter
//@Setter
//public class Review {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private Integer rating;
//
//    @Column(length = 1000)
//    private String comment;
//    private LocalDateTime createdAt;
//
//    @ManyToOne
//    private Product product;
//
//    @ManyToOne
//    private User user;
//}