//package com.app.productcatalog.service;
//
//import com.app.productcatalog.dto.ProductImageDTO;
//import com.app.productcatalog.dto.ProductRequestDTO;
//import com.app.productcatalog.dto.ProductResponseDTO;
//import com.app.productcatalog.dto.UpdateProductDTO;
//import com.app.productcatalog.model.Category;
//import com.app.productcatalog.model.Product;
//import com.app.productcatalog.model.ProductImage;
//import com.app.productcatalog.model.Review;
//import com.app.productcatalog.repository.CategoryRepository;
//import com.app.productcatalog.repository.ProductRepository;
//import com.app.productcatalog.repository.ReviewRepository;
//import lombok.RequiredArgsConstructor;
//import org.jspecify.annotations.NonNull;
//import org.springframework.data.domain.*;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class ProductService {
//
//    private final ProductRepository productRepository;
//    private final CategoryRepository categoryRepository;
//    private final ReviewRepository reviewRepository;
//
//    public Page<ProductResponseDTO> getProducts(int page, int size, String search, Long categoryId, String sortDir) {
//
//        Sort sort = sortDir.equalsIgnoreCase("desc")
//                ? Sort.by("price").descending()
//                : Sort.by("price").ascending();
//
//        Pageable pageable = PageRequest.of(page, size, sort);
//        Page<Product> products;
//
//        if(categoryId != null && search != null)
//            products = productRepository.findByCategoryIdAndNameContainingIgnoreCase(categoryId,search,pageable);
//        else if(categoryId != null)
//            products = productRepository.findByCategoryId(categoryId,pageable);
//        else if(search != null)
//            products = productRepository.findByNameContainingIgnoreCase(search, pageable);
//        else
//            products = productRepository.findAll(pageable);
//
//        return products.map(this::mapToDTO);
//    }
//
//    public ProductResponseDTO createProduct(@NonNull ProductRequestDTO dto){
//
//        Category category = categoryRepository
//                .findById(dto.getCategoryId())
//                .orElseThrow(() ->
//                        new RuntimeException("Category not found"));
//
//        Product product = new Product();
//
//        product.setName(dto.getName());
//        product.setDescription(dto.getDescription());
//        product.setPrice(dto.getPrice());
//        product.setQuantity(dto.getQuantity());
//        product.setCategory(category);
//
//    /*
//        PRODUCT IMAGE
//    */
//
//        ProductImage image = new ProductImage();
//
//        image.setImageUrl(dto.getImageUrl());
//        image.setScale(dto.getScale());
//        image.setPositionX(dto.getPositionX());
//        image.setPositionY(dto.getPositionY());
//
//        image.setProduct(product);
//
//        product.getImages().add(image);
//
//        Product saved =
//                productRepository.save(product);
//
//        return mapToDTO(saved);
//    }
//
//    private ProductResponseDTO mapToDTO(Product product){
//        List<Review> reviews = reviewRepository.findByProduct(product);
//        double averageRating = 0;
//
//        if(!reviews.isEmpty()){
//            averageRating = reviews.stream()
//                    .mapToInt(Review::getRating)
//                    .average()
//                    .orElse(0);
//        }
//
//        return ProductResponseDTO.builder()
//                .id(product.getId())
//                .name(product.getName())
//                .description(product.getDescription())
//                .price(product.getPrice())
//                .quantity(product.getQuantity())
//                .categoryId(product.getCategory().getId())
//                .categoryName(product.getCategory().getName())
//                .averageRating(averageRating)
//                .reviewCount(reviews.size())
//                .images(product.getImages()
//                                .stream()
//                                .map(image ->
//                                        ProductImageDTO
//                                                .builder()
//                                                .id(image.getId())
//                                                .imageUrl(image.getImageUrl())
//                                                .scale(image.getScale())
//                                                .positionX(image.getPositionX())
//                                                .positionY(image.getPositionY())
//                                                .primaryImage(image.getPrimaryImage())
//                                                .build()
//                                ).toList())
//                .build();
//    }
//
//    public ProductResponseDTO updateProduct(Long productId, UpdateProductDTO dto){
//
//        Product product =
//                productRepository
//                        .findById(productId)
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Product not found"
//                                ));
//
//        Category category =
//                categoryRepository
//                        .findById(dto.getCategoryId())
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Category not found"
//                                ));
//
//        product.setName(dto.getName());
//
//        product.setDescription(dto.getDescription());
//
//        product.setPrice(dto.getPrice());
//
//        product.setQuantity(dto.getQuantity());
//
//        product.setCategory(category);
//
//    /*
//        UPDATE IMAGE
//    */
//
//        ProductImage image;
//
//        if(product.getImages().isEmpty()){
//
//            image = new ProductImage();
//
//            image.setProduct(product);
//
//            product.getImages().add(image);
//
//        } else {
//
//            image = product.getImages().get(0);
//        }
//
//        image.setImageUrl(dto.getImageUrl());
//
//        image.setScale(dto.getScale());
//
//        image.setPositionX(dto.getPositionX());
//
//        image.setPositionY(dto.getPositionY());
//
//        Product updated =
//                productRepository.save(product);
//
//        return mapToDTO(updated);
//    }
//
//    public String deleteProduct(Long productId){
//        Product product = productRepository
//                .findById(productId)
//                .orElseThrow(() ->
//                        new RuntimeException(
//                                "Product not found"
//                        ));
//        productRepository.delete(product);
//
//        return "Product deleted successfully";
//    }
//
//    public Object getProduct(Long id) {
//        return productRepository
//                .findById(id)
//                .orElseThrow(() -> new RuntimeException("Product not found"));
//    }
//}


package com.app.productcatalog.service;

import com.app.productcatalog.dto.ProductRequestDTO;
import com.app.productcatalog.dto.ProductResponseDTO;
import com.app.productcatalog.dto.UpdateProductDTO;
import com.app.productcatalog.model.Category;
import com.app.productcatalog.model.Product;
import com.app.productcatalog.model.Review;
import com.app.productcatalog.repository.CategoryRepository;
import com.app.productcatalog.repository.ProductRepository;
import com.app.productcatalog.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;

    public Page<ProductResponseDTO> getProducts(
            int page,
            int size,
            String search,
            Long categoryId,
            String sortDir
    ) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by("price").descending()
                : Sort.by("price").ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> products;

        boolean hasSearch = search != null && !search.trim().isEmpty();

        if(categoryId != null && hasSearch)
            products = productRepository.findByActiveTrueAndCategoryIdAndNameContainingIgnoreCase(categoryId, search, pageable);
        else if(categoryId != null)
            products = productRepository.findByActiveTrueAndCategoryId(categoryId, pageable);
        else if(hasSearch)
            products = productRepository.findByActiveTrueAndNameContainingIgnoreCase(search, pageable);
        else
            products = productRepository.findByActiveTrue(pageable);

        return products.map(this::mapToDTO);
    }

    public ProductResponseDTO createProduct(ProductRequestDTO dto){

        Category category = categoryRepository
                .findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setCategory(category);

        Product saved = productRepository.save(product);

        return mapToDTO(saved);
    }

    private ProductResponseDTO mapToDTO(Product product){
        List<Review> reviews = reviewRepository.findByProduct(product);
        double averageRating = 0;

        if(!reviews.isEmpty()){
            averageRating = reviews.stream()
                            .mapToInt(Review::getRating)
                            .average()
                            .orElse(0);
        }

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                /*
                    NEW
                 */
                .averageRating(averageRating)
                .reviewCount(reviews.size())
                .build();
    }

    public ProductResponseDTO updateProduct(Long productId, UpdateProductDTO dto){
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found"
                        ));

        Category category = categoryRepository
                .findById(dto.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Category not found"
                        ));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setCategory(category);
        Product updated = productRepository.save(product);

        return mapToDTO(updated);
    }

    public String deleteProduct(Long productId){
        Product product = productRepository.findById(productId)
                            .orElseThrow(() -> new RuntimeException("Product not found"
                        ));

        product.setActive(false);
        productRepository.save(product);

        return "Product deleted successfully";
    }

    public Object getProduct(Long id) {
        return productRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
