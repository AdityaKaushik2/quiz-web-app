package com.quiz.backend.service;

import com.quiz.backend.dto.RegisterUserDTO;
import com.quiz.backend.dto.UserDTO;
import com.quiz.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserDTO> getAllUsers();

    User saveUser(RegisterUserDTO newRegisterUserDTO);

    Optional<UserDTO> getUser(String username);

    void deleteUser(Long id);

    User updateUser(Long id, UserDTO newUser);

    UserDTO authenticate(String email, String password);

}
