package com.quiz.backend.service;

import com.quiz.backend.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User saveUser(User newUser);
}
