package com.quiz.backend.service;

import com.quiz.backend.dto.QuizDTO;
import com.quiz.backend.entity.Quiz;

import java.util.List;

public interface QuizService {
    List<QuizDTO> getAllQuiz(Long userId);

    Quiz saveQuiz(QuizDTO newQuiz, Long userId);

    void deleteQuiz(Long quizId, Long userId);

    Quiz updateQuiz(Long quizId, Long userId, QuizDTO updatedQuiz);

    Quiz getQuiz(String code);
}
