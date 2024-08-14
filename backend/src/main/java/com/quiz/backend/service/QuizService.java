package com.quiz.backend.service;

import com.quiz.backend.dto.QuizDTO;
import com.quiz.backend.dto.QuizResponseDTO;
import com.quiz.backend.entity.Quiz;

import java.util.List;

public interface QuizService {
    List<QuizResponseDTO> getAllQuiz(Long userId);

    Quiz saveQuiz(QuizDTO newQuiz, Long userId);

    void deleteQuiz(Long quizId, Long userId);

    Quiz updateQuiz(Long quizId, Long userId, QuizDTO updatedQuiz);

    QuizResponseDTO getQuiz(String code);
}
