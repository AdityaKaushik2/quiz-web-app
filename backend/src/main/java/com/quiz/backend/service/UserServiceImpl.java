package com.quiz.backend.service;
import com.quiz.backend.entity.User;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service

public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User newUser) {
        return userRepository.save(newUser);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean deleteUser(Long id) {
        Optional<User> user =  userRepository.findById(id);
        if(user.isEmpty()){
            throw new UserNotFoundException("User Does not exist");
        } else{
            userRepository.deleteById(id);
            return true;
        }
    }

    @Override
    public User updateUser(Long id,User newUser){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            User updatedUser = user.get();
            updatedUser.setFirstName(newUser.getFirstName());
            updatedUser.setLastName(newUser.getLastName());
            updatedUser.setEmail(newUser.getEmail());
            updatedUser.setUsername(newUser.getUsername());
            updatedUser.setPassword(newUser.getPassword());
            updatedUser.setRole(newUser.getRole());
            updatedUser.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(updatedUser);
        } else{
            throw new UserNotFoundException("User with id " + id + " not found");
        }
    }
}
