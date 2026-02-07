package com.jayshreekrishna.userapi.controller;

import com.jayshreekrishna.userapi.dto.ApiResponse;
import com.jayshreekrishna.userapi.dto.LoginRequest;
import com.jayshreekrishna.userapi.dto.SignupRequest;
import com.jayshreekrishna.userapi.model.User;
import com.jayshreekrishna.userapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<User>> signup(@Valid @RequestBody SignupRequest request) {
        try {
            User user = new User(
                    request.getName(),
                    request.getMobileNumber(),
                    request.getUsername(),
                    request.getPassword()
            );
            
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(ApiResponse.success("Account created successfully!", savedUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to create account: " + e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(@Valid @RequestBody LoginRequest request) {
        return userService.verifyUser(request.getUsername(), request.getPassword())
                .map(user -> {
                    // Don't send password in response
                    User safeUser = new User(user.getName(), user.getMobileNumber(), user.getUsername(), "");
                    return ResponseEntity.ok(ApiResponse.success("Login successful!", safeUser));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid username or password")));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        // Remove passwords from response
        users.forEach(user -> user.setPassword(""));
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        ApiResponse<Map<String, String>> response = ApiResponse.error("Validation failed");
        response.setData(errors);
        return ResponseEntity.badRequest().body(response);
    }
}
