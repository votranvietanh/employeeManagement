package com.vietanh.employeesystem.service;

//import com.ducminh.employeesystem.model.PasswordResetToken;
import com.vietanh.employeesystem.model.User;
import com.vietanh.employeesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User addUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setOldPassword(encodedPassword);
        user.setRole("ROLE_USER");
        userRepository.save(user);
        return user;
    }

    @Override
    public String updateUserRole(User user, int userID) {
        Optional<User> optionalUser = userRepository.findById(userID);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setRole(user.getRole());
            userRepository.save(existingUser);
            return "User role updated sucessfully";
        }
        return "No such user found";
    }

    @Override
    public String updateUserInfo(User user, int userID) {
        Optional<User> optionalUser = userRepository.findById(userID);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setAddress(user.getAddress());
            existingUser.setEmail(user.getEmail());
            existingUser.setFullName(user.getFullName());
            existingUser.setIdentityNumber(user.getIdentityNumber());
            existingUser.setPhone(user.getPhone());

            userRepository.save(existingUser);
            return "User Info updated sucessfully";
        }
        return "No such user found or the info is not correct";
    }

    @Override
    public String updateUserPassword(User user, int userID) {
        Optional<User> optionalUser = userRepository.findById(userID);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            String oldPassword = existingUser.getOldPassword();
            String rawConfirmPassword = user.getOldPassword();
            String newPassword = user.getPassword();
            if (passwordEncoder.matches(rawConfirmPassword,oldPassword)) {
                String encodedPassword = passwordEncoder.encode(newPassword);
                existingUser.setPassword(encodedPassword);
                existingUser.setOldPassword(encodedPassword);
                userRepository.save(existingUser);
                return "User password changed sucessfully";
            }
            else if(!passwordEncoder.matches(rawConfirmPassword,oldPassword)){
                return "password does not match";
            }
        }
        return "No such user found";
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(int userID) {
        return userRepository.findById(userID);
    }

    @Override
    public String deleteUser(int userID) {
        userRepository.deleteById(userID);
        return "User Removed";
    }
}
