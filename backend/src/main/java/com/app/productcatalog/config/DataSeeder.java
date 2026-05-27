package com.app.productcatalog.config;

import com.app.productcatalog.model.*;
import com.app.productcatalog.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Value("${super.admin.name}")
    private String superAdminName;

    @Value("${super.admin.email}")
    private String superAdminEmail;

    @Value("${super.admin.phone}")
    private String superAdminPhone;

    @Value("${super.admin.password}")
    private String superAdminPassword;

    @Override
    public void run(String... args) {

        //SUPER ADMIN USER
        if(userRepository.findByEmail(superAdminEmail).isEmpty()){
            User superAdmin = new User();
            superAdmin.setName(superAdminName);
            superAdmin.setEmail(superAdminEmail);
            superAdmin.setPhone(superAdminPhone);
            superAdmin.setPassword(passwordEncoder.encode(superAdminPassword));

            superAdmin.setRole(Role.ROLE_SUPER_ADMIN);
            superAdmin.setVerified(true);
            userRepository.save(superAdmin);
        }

        // CATEGORIES + PRODUCTS
//        if(categoryRepository.count() == 0){
//
//            Category electronics = new Category();
//            electronics.setName("Electronics");
//
//            Category clothing = new Category();
//            clothing.setName("Clothing");
//
//            Category home = new Category();
//            home.setName("Home & Kitchen");
//
//            categoryRepository.saveAll(Arrays.asList(electronics, clothing, home));
//
//            Product phone = new Product();
//            phone.setName("iPhone 15");
//            phone.setDescription("Latest Apple smartphone");
//            phone.setImageUrl("https://placehold.co/300x300");
//            phone.setPrice(79999.0);
//            phone.setQuantity(10);
//            phone.setCategory(electronics);
//
//            Product laptop = new Product();
//            laptop.setName("Gaming Laptop");
//            laptop.setDescription("High performance gaming laptop");
//            laptop.setImageUrl("https://placehold.co/300x300");
//            laptop.setPrice(120000.0);
//            laptop.setQuantity(5);
//            laptop.setCategory(electronics);
//
//            Product tshirt = new Product();
//            tshirt.setName("Oversized T-Shirt");
//            tshirt.setDescription("Premium cotton oversized tshirt");
//            tshirt.setImageUrl("https://placehold.co/300x300");
//            tshirt.setPrice(999.0);
//            tshirt.setQuantity(20);
//            tshirt.setCategory(clothing);
//
//            Product mixer = new Product();
//            mixer.setName("Kitchen Mixer");
//            mixer.setDescription("High speed kitchen mixer");
//            mixer.setImageUrl("https://placehold.co/300x300");
//            mixer.setPrice(3499.0);
//            mixer.setQuantity(10);
//            mixer.setCategory(home);
//
//            productRepository.saveAll(Arrays.asList(phone, laptop, tshirt, mixer));
//        }
    }
}