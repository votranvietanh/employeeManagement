package com.vietanh.employeesystem.config;

import com.vietanh.employeesystem.model.User;
import com.vietanh.employeesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

//Class dùng để tương tác và lấy dữ lệu user
@Component
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Lấy userInfo ra từ database
        //cần convert unserInfo ra UserDetails object
        Optional<User> userInfo = repository.findByUsername(username);
        //tránh duplicate user
        return userInfo.map(UserInfoUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!" + username));
    }
}
