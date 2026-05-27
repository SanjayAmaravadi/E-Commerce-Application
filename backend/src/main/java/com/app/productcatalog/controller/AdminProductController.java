package com.app.productcatalog.controller;

import com.app.productcatalog.dto.*;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminProductController {

    private final ProductService productService;

    @PostMapping
    public ApiResponse<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO dto){
        return new ApiResponse<>(true, "Product created successfully", productService.createProduct(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductResponseDTO> updateProduct(@PathVariable Long id, @RequestBody UpdateProductDTO dto){
        return new ApiResponse<>(true, "Product updated successfully", productService.updateProduct(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteProduct(@PathVariable Long id){
        return new ApiResponse<>(true, productService.deleteProduct(id), null);
    }
}