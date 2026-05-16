package com.management.LabManagement.controller;

import com.management.LabManagement.model.User;
import com.management.LabManagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ---------------- Teacher Signup ----------------

    @PostMapping("/teacher-signup")
    public User teacherSignup(@RequestBody User user) {

        return authService.teacherSignup(user);
    }

    @PostMapping("/teacher-login")
    public User teacherLogin(@RequestBody User user) {

        return authService.teacherLogin(
                user.getEmail(),
                user.getPassword());
    }

    @PostMapping("/admin-signup")
public User adminSignup(@RequestBody User user) {

    return authService.adminSignup(user);
}

@PostMapping("/admin-login")
public User adminLogin(@RequestBody User user) {

    return authService.adminLogin(
            user.getEmail(),
            user.getPassword()
    );
}

@PostMapping("/student-signup")
public User studentSignup(@RequestBody User user) {

    return authService.studentSignup(user);
}

@PostMapping("/student-login")
public User studentLogin(@RequestBody User user) {

    return authService.studentLogin(
            user.getEmail(),
            user.getPassword()
    );
}
}
