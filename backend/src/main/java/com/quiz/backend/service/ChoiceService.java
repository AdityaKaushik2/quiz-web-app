package com.quiz.backend.service;

import com.quiz.backend.entity.Choice;

import java.util.List;

public interface ChoiceService {
    List<Choice> getAllChoice(Long userId, Long quizId,Long questionId);

    Choice saveChoice(Long userId, Long quizId, Long questionId, Choice choice);
}
