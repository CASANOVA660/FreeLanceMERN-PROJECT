package com.example.collectdefond.Controllers;
import com.example.collectdefond.Models.User;
import com.example.collectdefond.ServiceImpl.UserServiceImp;
import com.example.collectdefond.dto.AuthResponse;
import com.example.collectdefond.dto.LoginRequest;
import com.example.collectdefond.dto.UserDTO;
import com.example.collectdefond.servicee.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class UserController {
    @Autowired
    private UserServiceImp userServ;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userServ.register(user);
            String token = jwtService.generateToken(registeredUser);
            AuthResponse response = new AuthResponse(
                    token,
                    new UserDTO(registeredUser)
            );
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new RuntimeException("Error registering user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userServ.login(loginRequest.getEmail(), loginRequest.getPassword());
            String token = jwtService.generateToken(user);
            AuthResponse response = new AuthResponse(
                    token,
                    new UserDTO(user)
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("Error during login: " + e.getMessage());
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalUserCount() {
        long count = userServ.getTotalUserCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }


}
