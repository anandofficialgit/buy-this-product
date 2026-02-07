package com.jayshreekrishna.userapi.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayshreekrishna.userapi.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    private final ObjectMapper objectMapper;
    private final String dataFilePath;
    
    public UserService(@Value("${app.data.file:data/users.json}") String dataFilePath) {
        this.objectMapper = new ObjectMapper();
        this.dataFilePath = dataFilePath;
        initializeDataFile();
    }
    
    private void initializeDataFile() {
        try {
            File dataFile = new File(dataFilePath);
            File parentDir = dataFile.getParentFile();
            if (parentDir != null && !parentDir.exists()) {
                parentDir.mkdirs();
            }
            if (!dataFile.exists()) {
                // Create empty JSON array file
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(dataFile, new ArrayList<User>());
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize data file", e);
        }
    }
    
    private List<User> readUsersFromFile() {
        try {
            File dataFile = new File(dataFilePath);
            if (!dataFile.exists() || dataFile.length() == 0) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(dataFile, new TypeReference<List<User>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to read users from file", e);
        }
    }
    
    private void writeUsersToFile(List<User> users) {
        try {
            File dataFile = new File(dataFilePath);
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(dataFile, users);
        } catch (IOException e) {
            throw new RuntimeException("Failed to write users to file", e);
        }
    }
    
    public List<User> getAllUsers() {
        return readUsersFromFile();
    }
    
    public Optional<User> findByUsername(String username) {
        return readUsersFromFile().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }
    
    public Optional<User> findByMobileNumber(String mobileNumber) {
        return readUsersFromFile().stream()
                .filter(user -> user.getMobileNumber().equals(mobileNumber))
                .findFirst();
    }
    
    public User saveUser(User user) {
        List<User> users = readUsersFromFile();
        
        // Check if username already exists
        if (findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        
        // Check if mobile number already exists
        if (findByMobileNumber(user.getMobileNumber()).isPresent()) {
            throw new IllegalArgumentException("Mobile number already exists");
        }
        
        users.add(user);
        writeUsersToFile(users);
        return user;
    }
    
    public Optional<User> verifyUser(String username, String password) {
        Optional<User> user = findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }
}
