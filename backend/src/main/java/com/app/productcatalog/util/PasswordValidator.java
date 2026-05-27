package com.app.productcatalog.util;

public class PasswordValidator {
    public static boolean isStrongPassword(String password){
        return password.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$");
    }
}