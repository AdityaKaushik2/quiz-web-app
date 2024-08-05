package com.quiz.backend.service;

import com.quiz.backend.dto.UserDTO;
import com.quiz.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserDTO> getAllUsers();

    User saveUser(UserDTO newUserDTO);

    Optional<UserDTO> getUser(Long id);

    void deleteUser(Long id);

    User updateUser(Long id, UserDTO newUser);
}
