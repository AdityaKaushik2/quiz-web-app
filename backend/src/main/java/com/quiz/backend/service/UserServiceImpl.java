package com.quiz.backend.service;

import com.quiz.backend.dto.RegisterUserDTO;
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
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, QuizRepository quizRepository, ChoiceRepository choiceRepository, QuestionRepository questionRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.choiceRepository = choiceRepository;
        this.questionRepository = questionRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(RegisterUserDTO newRegisterUserDTO) {
        User user = modelMapper.map(newRegisterUserDTO, User.class);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setUsername(newRegisterUserDTO.getUsername().toLowerCase());
        user.setRole("user");
        user.setPassword(passwordEncoder.encode(newRegisterUserDTO.getPassword()));
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
    public Optional<UserDTO> getUser(String username) {
        return userRepository.findByUsername(username)
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
                choiceRepository.deleteByQuestion_Id(question.getId());
            }
            questionRepository.deleteByQuiz_Id(quiz.getId());
        }
        quizRepository.deleteByUser_Id(id);

        userRepository.delete(user);
    }

    @Override
    public User updateUser(Long id, UserDTO newRegisterUserDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));

        user.setFirstName(newRegisterUserDTO.getFirstName());
        user.setLastName(newRegisterUserDTO.getLastName());
        user.setEmail(newRegisterUserDTO.getEmail());
        user.setUsername(newRegisterUserDTO.getUsername());
        user.setPassword(user.getPassword());
        user.setRole("user");
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    @Override
    public UserDTO authenticate(String username, String password) {
    User user = userRepository.findByUsername(username).orElseThrow(    () -> new UserNotFoundException("User with username " + username + " not found"));

    if (user != null && passwordEncoder.matches(password, user.getPassword())) {
        return modelMapper.map(user, UserDTO.class);
    }
        return null;
    }
}

