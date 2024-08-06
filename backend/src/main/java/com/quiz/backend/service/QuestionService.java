package com.quiz.backend.service;

import com.quiz.backend.dto.QuestionDTO;
import com.quiz.backend.entity.Question;

import java.util.List;

public interface QuestionService {

    List<QuestionDTO> getAllQuestion(Long quizId, Long userId);

    Question saveQuestion(Long quizId, Long userId, QuestionDTO questionDTO);

    Question updateQuestion(Long userId, Long quizId, Long questionId, QuestionDTO question);

    void deleteQuestion(Long userId, Long quizId, Long questionId);
}
