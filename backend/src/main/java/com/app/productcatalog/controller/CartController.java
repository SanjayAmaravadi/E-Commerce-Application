package com.app.productcatalog.controller;

import com.app.productcatalog.dto.AddToCartRequest;
import com.app.productcatalog.dto.CartResponseDTO;
import com.app.productcatalog.model.Cart;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ApiResponse<CartResponseDTO> getCart(){
        return new ApiResponse<>(true, "Cart fetched successfully", cartService.getCart());
    }

    @PostMapping
    public ApiResponse<Cart> addToCart(@Valid @RequestBody AddToCartRequest request){
        return new ApiResponse<>(true, "Added to cart", cartService.addToCart(request));
    }

    @PutMapping("/decrease/{itemId}")
    public ApiResponse<Cart> decreaseQuantity(@PathVariable Long itemId){
        return new ApiResponse<>(true, "Quantity decreased", cartService.decreaseQuantity(itemId));
    }

    @DeleteMapping("/{itemId}")
    public ApiResponse<Cart> removeItem(@PathVariable Long itemId){
        return new ApiResponse<>(true, "Item removed", cartService.removeItem(itemId));
    }
}