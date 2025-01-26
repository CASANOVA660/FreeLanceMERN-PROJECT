package com.example.collectdefond.Service;

import com.example.collectdefond.Models.User;

public interface UserServ {
    long getTotalUserCount();
    User register(User user);
    User login(String email, String password);
}
