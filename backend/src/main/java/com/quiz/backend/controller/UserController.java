package com.quiz.backend.controller;

import com.quiz.backend.entity.User;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    User saveUser(@RequestBody User newUser) {
        return userService.saveUser(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    User getUser(@PathVariable Long id) {
        return userService.getUser(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));
    }

    @DeleteMapping("/user/{id}")
    boolean deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }

    @PutMapping("/user/{id}")
    User updateUser(@PathVariable Long id,@RequestBody User newUser){
        return userService.updateUser(id,newUser);
    }
}
