package com.quiz.backend.service;

import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.User;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Quiz> getAllQuiz(Long id) {
        return quizRepository.findByUser_Id(id);
    }

    @Override
    public Quiz saveQuiz(Quiz newQuiz, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("User Not Found"));
        newQuiz.setUser(user);
        return quizRepository.save(newQuiz);
    }
}
