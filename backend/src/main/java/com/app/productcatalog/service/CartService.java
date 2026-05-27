package com.app.productcatalog.service;

import com.app.productcatalog.dto.AddToCartRequest;
import com.app.productcatalog.dto.CartResponseDTO;
import com.app.productcatalog.model.*;
import com.app.productcatalog.repository.*;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AppSettingsRepository appSettingsRepository;

    public Cart getUserCart(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        return cartRepository
                .findByUser(user)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    public CartResponseDTO getCart(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        double subtotal = 0;
        for(CartItem item : cart.getItems())
            subtotal += item.getProduct().getPrice() * item.getQuantity();

        AppSettings settings = appSettingsRepository.findById(1L)
                        .orElseThrow(() -> new RuntimeException("Settings not found"));


        double gst = subtotal * (settings.getGstPercentage() / 100);
        double deliveryFee = subtotal > settings.getFreeDeliveryThreshold() ? 0 : settings.getDeliveryFee();
        double platformFee = settings.getPlatformFee();
        double totalAmount = subtotal + gst + deliveryFee + platformFee;


        return CartResponseDTO.builder()
                .items(cart.getItems())
                .subtotal(subtotal)
                .gst(gst)
                .deliveryFee(deliveryFee)
                .platformFee(platformFee)
                .totalAmount(totalAmount)
                .build();
    }

//    public CartResponseDTO getCart(){
//        Cart cart = getUserCart();
//        double subtotal = 0;
//        for(CartItem item : cart.getItems())
//            subtotal += item.getProduct().getPrice() * item.getQuantity();
//
//        double gst = subtotal * 0.18;
//        double deliveryFee = subtotal > 499 ? 0 : 49;
//        double platformFee = 10;
//        double totalAmount = subtotal + gst + deliveryFee + platformFee;
//
//        return CartResponseDTO.builder()
//                .items(cart.getItems())
//                .subtotal(subtotal)
//                .gst(gst)
//                .deliveryFee(deliveryFee)
//                .platformFee(platformFee)
//                .totalAmount(totalAmount)
//                .build();
//    }

    public Cart addToCart(AddToCartRequest request){
        Cart cart = getUserCart();
        Product product = productRepository
                .findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        /*
            OUT OF STOCK
        */
        if(product.getQuantity() <= 0)
            throw new RuntimeException("Product Out Of Stock");

        /*
            ALREADY EXISTS IN CART
        */
        for(CartItem item : cart.getItems()){
            if(item.getProduct().getId().equals(product.getId())){
                int newQuantity = item.getQuantity() + request.getQuantity();

                /*
                    STOCK LIMIT
                */
                if(newQuantity > product.getQuantity())
                    throw new RuntimeException("Only " + product.getQuantity() + " item(s) available in stock");

                item.setQuantity(newQuantity);
                return cartRepository.save(cart);
            }
        }

        /*
            NEW ITEM
        */
        if(request.getQuantity() > product.getQuantity())
            throw new RuntimeException("Only " + product.getQuantity() + " item(s) available in stock");

        CartItem item = new CartItem();
        item.setProduct(product);
        item.setQuantity(request.getQuantity());
        item.setCart(cart);
        cart.getItems().add(item);
        return cartRepository.save(cart);
    }

    public Cart decreaseQuantity(Long itemId){
        Cart cart = getUserCart();
        CartItem targetItem = null;
        for(CartItem item : cart.getItems()){
            if(item.getId().equals(itemId)){
                targetItem = item;
                break;
            }
        }

        if(targetItem == null)
            throw new RuntimeException("Cart item not found");

        /*
            DECREASE
        */
        if(targetItem.getQuantity() > 1)
            targetItem.setQuantity(targetItem.getQuantity() - 1);
        else
            cart.getItems().remove(targetItem);

        return cartRepository.save(cart);
    }

    public Cart removeItem(Long itemId){
        Cart cart = getUserCart();
        cart.getItems().removeIf(item -> item.getId().equals(itemId));
        return cartRepository.save(cart);
    }

    public Cart saveCart(Cart cart){
        return cartRepository.save(cart);
    }
}