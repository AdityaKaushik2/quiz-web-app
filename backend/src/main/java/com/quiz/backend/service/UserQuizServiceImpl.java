package com.quiz.backend.service;

import com.quiz.backend.dto.UserQuizDTO;
import com.quiz.backend.entity.UserQuiz;
import com.quiz.backend.repository.UserQuizRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserQuizServiceImpl implements UserQuizService {

    private final UserQuizRepository userQuizRepository;
    private final ModelMapper modelMapper;
    @Autowired
    public UserQuizServiceImpl(UserQuizRepository userQuizRepository, ModelMapper modelMapper) {
        this.userQuizRepository = userQuizRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserQuiz saveUserQuiz(UserQuiz userQuiz) {
        return userQuizRepository.save(userQuiz);
    }

    @Override
    public UserQuizDTO getUserQuizById(Long id) {
        Optional<UserQuiz> userQuiz = userQuizRepository.findById(id);
        return userQuiz.map(quiz -> modelMapper.map(quiz, UserQuizDTO.class)).orElseThrow(
                () -> new RuntimeException("UserQuiz not found with id: " + id)
        );
    }

    @Override
    public List<UserQuiz> getUserQuizzesByUserId(Long userId) {
        return userQuizRepository.findByUserId(userId);
    }

    @Override
    public List<UserQuiz> getUserQuizzesByQuizId(Long quizId) {
        return userQuizRepository.findByQuizId(quizId);
    }

    @Override
    public Optional<UserQuiz> getUserQuizByUserIdAndQuizId(Long userId, Long quizId) {
        return userQuizRepository.findByUserIdAndQuizId(userId, quizId);
    }
}
