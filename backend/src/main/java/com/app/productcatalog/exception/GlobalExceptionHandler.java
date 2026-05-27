package com.app.productcatalog.exception;

import com.app.productcatalog.payload.ApiResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /*
        RUNTIME EXCEPTION
    */

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<String>> handleRuntime(
            RuntimeException ex
    ){

        ApiResponse<String> response =
                new ApiResponse<>(
                        false,
                        ex.getMessage(),
                        null
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    /*
        VALIDATION EXCEPTION
    */

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<String>> handleValidation(
            MethodArgumentNotValidException ex
    ){

        String message = ex
                .getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        ApiResponse<String> response =
                new ApiResponse<>(
                        false,
                        message,
                        null
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }
}

//package com.app.productcatalog.exception;
//
//import com.app.productcatalog.payload.ApiResponse;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.*;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(RuntimeException.class)
//    public ApiResponse<String> handleRuntime(
//            RuntimeException ex
//    ){
//
//        return new ApiResponse<>(
//                false,
//                ex.getMessage(),
//                null
//        );
//    }
//
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ApiResponse<String> handleValidation(
//            MethodArgumentNotValidException ex
//    ){
//
//        String message = ex
//                .getBindingResult()
//                .getFieldError()
//                .getDefaultMessage();
//
//        return new ApiResponse<>(
//                false,
//                message,
//                null
//        );
//    }
//}