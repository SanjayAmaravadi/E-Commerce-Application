package com.app.productcatalog.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(min = 3, message = "Name must contain at least 3 characters")
    private String name;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Invalid phone number"
    )
    private String phone;

    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$",
            message = "Weak password"
    )
    private String password;
}

//package com.app.productcatalog.dto;
//
//import lombok.Data;
//
//@Data
//public class RegisterRequestDTO {
//    private String name;
//    private String email;
//    private String phone;
//    private String password;
//}