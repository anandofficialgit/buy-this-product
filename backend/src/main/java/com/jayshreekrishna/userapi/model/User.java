package com.jayshreekrishna.userapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("mobileNumber")
    private String mobileNumber;
    
    @JsonProperty("username")
    private String username;
    
    @JsonProperty("password")
    private String password;
    
    // Default constructor
    public User() {
    }
    
    // Constructor with all fields
    public User(String name, String mobileNumber, String username, String password) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.username = username;
        this.password = password;
    }
    
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
    
    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", username='" + username + '\'' +
                ", password='***'" +
                '}';
    }
}
