package com.example.collectdefond.dto;

import com.example.collectdefond.Models.User;

public class UserDTO {
    private String name;
    private String email;
    private String role;

    public UserDTO(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole().toString().toLowerCase();
    }

    // Getters et Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
} 