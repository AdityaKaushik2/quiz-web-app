package com.quiz.backend.service;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.User;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service

public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository,QuizRepository quizRepository){
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
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
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User Does not exist"));

        //Deleting all the quizzes associated with the user before deleting the user
        List<Quiz> quizzes = quizRepository.findByUser_Id(id);
        quizRepository.deleteAll(quizzes);

        //Deleting the user
        userRepository.delete(user);
        return true;
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
