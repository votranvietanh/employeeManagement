package com.vietanh.employeesystem.controller;

import com.vietanh.employeesystem.model.User;
import com.vietanh.employeesystem.repository.UserRepository;
import com.vietanh.employeesystem.service.JwtService;
import com.vietanh.employeesystem.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/getAll")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    @GetMapping("/{userID}")
    public Optional getTeamById(@PathVariable int userID) {
        return userService.getUserById(userID);
    }

    @DeleteMapping("/{userID}")
    public String deleteUser(@PathVariable int userID) {
        return userService.deleteUser(userID);
    }

    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok("Logout successful");
    }

    //update
    @PutMapping("/update_userrole/{userID}")
    public String updateUserRole(@RequestBody User user, @PathVariable int userID) {
        return userService.updateUserRole(user, userID);
    }

    @PutMapping("update_userinfo/{userID}")
    public String updateUserInfo(@RequestBody User user, @PathVariable int userID) {
        return userService.updateUserInfo(user, userID);
    }

    @PutMapping("update_userpassword/{userID}")
    public String updateUserPassword(@RequestBody User user, @PathVariable int userID) {
        return userService.updateUserPassword(user, userID);
    }

    //Đăng nhập
    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody User authRequest) {
        Optional<User> optionalUser;

        // Check if authRequest contains username or email
        if (authRequest.getUsername() != null) {
            optionalUser = userRepository.findByUsername(authRequest.getUsername());
        } else if (authRequest.getEmail() != null) {
            optionalUser = Optional.ofNullable(userRepository.findByEmail(authRequest.getEmail()));
        } else {
            throw new IllegalArgumentException("Invalid authentication request!");
        }

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            authRequest.getPassword()));

            if (authentication.isAuthenticated()) {
                String role = user.getRole();
                return jwtService.generateToken(user.getUsername(), role);
            } else {
                throw new UsernameNotFoundException("Invalid user request!");
            }
        } else {
            return "There's no User to get from Repository" + authRequest.getUsername();
        }
    }

}
