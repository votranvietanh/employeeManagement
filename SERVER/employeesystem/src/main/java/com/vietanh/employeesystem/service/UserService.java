package com.vietanh.employeesystem.service;

import com.vietanh.employeesystem.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User addUser(User user); //aka register user

    public String updateUserRole(User user, int userID);

    public String updateUserInfo(User user, int userID);

    public String updateUserPassword(User user, int userID);

    public List<User> getAllUser();

    public Optional<User> getUserById(int userID);

    public String deleteUser(int userID);
}
