package com.quiz.backend.service;

import com.quiz.backend.entity.Question;

import java.util.List;

public interface QuestionService {

    List<Question> getAllQuestion(Long userId, Long quizId);
}
