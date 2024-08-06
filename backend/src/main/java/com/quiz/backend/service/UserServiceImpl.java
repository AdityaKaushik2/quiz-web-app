package com.quiz.backend.service;

import com.quiz.backend.dto.UserDTO;
import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.User;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.repository.ChoiceRepository;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final ChoiceRepository choiceRepository;
    private final QuestionRepository questionRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, QuizRepository quizRepository, ChoiceRepository choiceRepository, QuestionRepository questionRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.choiceRepository = choiceRepository;
        this.questionRepository = questionRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public User saveUser(UserDTO newUserDTO) {
        User user = modelMapper.map(newUserDTO, User.class);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserDTO> getUser(Long id) {
        return userRepository.findById(id)
                .map(user -> modelMapper.map(user, UserDTO.class));
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User Does not exist"));
        List<Quiz> quizzes = quizRepository.findByUser_Id(id);
        for (Quiz quiz : quizzes) {
            List<Question> questions = questionRepository.findByQuiz_Id(quiz.getId());
            for (Question question : questions) {
                // Delete all choices associated with each question
                choiceRepository.deleteByQuestion_Id(question.getId());
            }
            // Delete all questions associated with the quiz
            questionRepository.deleteByQuiz_Id(quiz.getId());
        }

        // Delete all quizzes associated with the user
        quizRepository.deleteByUser_Id(id);

        // Finally, delete the user
        userRepository.delete(user);
    }

    @Override
    public User updateUser(Long id, UserDTO newUserDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));

        user.setFirstName(newUserDTO.getFirstName());
        user.setLastName(newUserDTO.getLastName());
        user.setEmail(newUserDTO.getEmail());
        user.setUsername(newUserDTO.getUsername());
        user.setPassword(user.getPassword());
        user.setRole(newUserDTO.getRole());
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }
}

