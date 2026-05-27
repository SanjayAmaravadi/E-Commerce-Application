package com.app.productcatalog.service;

import com.app.productcatalog.model.*;
import com.app.productcatalog.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private User getCurrentUser(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow();
    }

    public List<Wishlist> getWishlist(){
        return wishlistRepository.findByUser(getCurrentUser());
    }

    public Wishlist addToWishlist(Long productId){
        User user = getCurrentUser();
        Product product = productRepository
                .findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if(wishlistRepository.findByUserAndProduct(user, product).isPresent()){
            throw new RuntimeException("Product already in wishlist");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProduct(product);
        return wishlistRepository.save(wishlist);
    }

    public void removeWishlist(Long id){
        wishlistRepository.deleteById(id);
    }
}