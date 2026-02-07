package com.jayshreekrishna.userapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, message = "Name must be at least 2 characters")
    private String name;
    
    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9")
    private String mobileNumber;
    
    @NotBlank(message = "Username is required")
    @Size(min = 3, message = "Username must be at least 3 characters")
    private String username;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getMobileNumber() {
        return mobileNumber;
    }
    
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
