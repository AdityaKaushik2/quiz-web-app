package com.quiz.backend.service;

import com.quiz.backend.entity.Quiz;

import java.util.List;

public interface QuizService {
    List<Quiz> getAllQuiz(Long id);

    Quiz saveQuiz(Quiz newQuiz, Long userId);

    void deleteQuiz(Long quizId, Long userId);
}
