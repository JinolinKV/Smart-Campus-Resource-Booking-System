package com.management.LabManagement.service;

import com.management.LabManagement.model.User;
import com.management.LabManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User teacherSignup(User user) {

        user.setRole("TEACHER");

        return userRepository.save(user);
    }

    public User teacherLogin(String email, String password) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.getRole().equals("TEACHER")) {
            throw new RuntimeException("Not a teacher");
        }

        return user;
    }

    public User adminSignup(User user) {

        user.setRole("ADMIN");

        return userRepository.save(user);
    }

    public User adminLogin(String email, String password) {

    User user = userRepository
            .findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Admin not found"));

    if (!user.getPassword().equals(password)) {
        throw new RuntimeException("Invalid password");
    }

    if (!user.getRole().equals("ADMIN")) {
        throw new RuntimeException("Not an admin");
    }

    return user;
}

public User studentSignup(User user) {

    user.setRole("STUDENT");

    return userRepository.save(user);
}

public User studentLogin(String email, String password) {

    User user = userRepository
            .findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    if (!user.getPassword().equals(password)) {
        throw new RuntimeException("Invalid password");
    }

    if (!user.getRole().equals("STUDENT")) {
        throw new RuntimeException("Not a student");
    }

    return user;
}
}
