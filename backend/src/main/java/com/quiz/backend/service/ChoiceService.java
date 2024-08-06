package com.quiz.backend.service;

import com.quiz.backend.dto.ChoiceDTO;
import com.quiz.backend.entity.Choice;

import java.util.List;

public interface ChoiceService {
    List<ChoiceDTO> getAllChoice(Long userId, Long quizId, Long questionId);

    Choice saveChoice(Long userId, Long quizId, Long questionId, Choice choice);

    void deleteChoice(Long userId, Long quizId, Long questionId, Long choiceId);

    Choice updateChoice(Long userId, Long quizId, Long questionId, Long choiceId, Choice choice);
}
