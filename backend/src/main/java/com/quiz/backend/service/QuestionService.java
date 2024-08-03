package com.quiz.backend.service;

import com.quiz.backend.entity.Question;

import java.util.List;

public interface QuestionService {

    List<Question> getAllQuestion(Long userId, Long quizId);

    Question saveQuestion(Long quizId, Long userId, Question newQuestion);

    Question updateQuestion(Long userId, Long quizId, Long questionId, Question question);

    void deleteQuestion(Long userId, Long quizId, Long questionId);
}
