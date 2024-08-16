package com.quiz.backend.service;

import com.quiz.backend.dto.UserQuizDTO;
import com.quiz.backend.entity.UserQuiz;

import java.util.List;
import java.util.Optional;

public interface UserQuizService {

    UserQuiz saveUserQuiz(UserQuiz userQuiz);

    UserQuizDTO getUserQuizById(Long id);

    List<UserQuiz> getUserQuizzesByUserId(Long userId);

    List<UserQuiz> getUserQuizzesByQuizId(Long quizId);

    Optional<UserQuiz> getUserQuizByUserIdAndQuizId(Long userId, Long quizId);
}
