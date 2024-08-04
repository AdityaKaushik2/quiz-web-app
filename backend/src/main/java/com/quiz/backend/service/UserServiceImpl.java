package com.quiz.backend.service;

import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.User;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.repository.ChoiceRepository;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final ChoiceRepository choiceRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, QuizRepository quizRepository, ChoiceRepository choiceRepository, QuestionRepository questionRepository) {
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.choiceRepository = choiceRepository;
        this.questionRepository = questionRepository;
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
    public User updateUser(Long id, User newUser) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User updatedUser = user.get();
            updatedUser.setFirstName(newUser.getFirstName());
            updatedUser.setLastName(newUser.getLastName());
            updatedUser.setEmail(newUser.getEmail());
            updatedUser.setUsername(newUser.getUsername());
            updatedUser.setPassword(newUser.getPassword());
            updatedUser.setRole(newUser.getRole());
            updatedUser.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(updatedUser);
        } else {
            throw new UserNotFoundException("User with id " + id + " not found");
        }
    }
}
