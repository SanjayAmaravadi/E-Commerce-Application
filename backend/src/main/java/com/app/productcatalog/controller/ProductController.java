package com.app.productcatalog.controller;

import com.app.productcatalog.dto.ProductRequestDTO;
import com.app.productcatalog.dto.ProductResponseDTO;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ApiResponse<Page<ProductResponseDTO>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "asc") String sort
    ){

        return new ApiResponse<>(
                true,
                "Products fetched successfully",
                productService.getProducts(page, size, search, categoryId, sort)
        );
    }

    @PostMapping
    public ApiResponse<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO dto){
        return new ApiResponse<>(
                true,
                "Product created successfully",
                productService.createProduct(dto)
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProduct(id));
    }
}