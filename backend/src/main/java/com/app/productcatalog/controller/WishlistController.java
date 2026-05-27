package com.app.productcatalog.controller;

import com.app.productcatalog.model.Wishlist;
import com.app.productcatalog.payload.ApiResponse;
import com.app.productcatalog.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {
    private final WishlistService wishlistService;

    @GetMapping
    public ApiResponse<List<Wishlist>> getWishlist(){
        return new ApiResponse<>(true, "Wishlist fetched", wishlistService.getWishlist());
    }

    @PostMapping("/{productId}")
    public ApiResponse<Wishlist> addWishlist(@PathVariable Long productId){
        return new ApiResponse<>(true, "Added to wishlist", wishlistService.addToWishlist(productId));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> removeWishlist(@PathVariable Long id){
        wishlistService.removeWishlist(id);
        return new ApiResponse<>(true, "Removed from wishlist", null);
    }
}