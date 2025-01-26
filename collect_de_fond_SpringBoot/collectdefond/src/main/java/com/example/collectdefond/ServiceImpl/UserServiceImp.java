package com.example.collectdefond.ServiceImpl;

import com.example.collectdefond.Models.User;
import com.example.collectdefond.Repository.UserRepository;
import com.example.collectdefond.Service.UserServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImp implements UserServ {
    @Autowired
    private UserRepository userRepository;

    @Override
    public long getTotalUserCount() {
        return userRepository.count();
    }

    @Override
    public User register(User user) {
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password) {
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new RuntimeException("Identifiants invalides");
        }
    }
}
