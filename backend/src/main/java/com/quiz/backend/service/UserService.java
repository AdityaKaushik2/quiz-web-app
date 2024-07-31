package com.quiz.backend.service;

import com.quiz.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();

    User saveUser(User newUser);

    Optional<User> getUser(Long id);

    boolean deleteUser(Long id);
}
