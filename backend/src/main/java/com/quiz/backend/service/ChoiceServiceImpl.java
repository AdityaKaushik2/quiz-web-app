package com.quiz.backend.service;

import com.quiz.backend.entity.Choice;
import com.quiz.backend.repository.ChoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChoiceServiceImpl implements ChoiceService {

    private final ChoiceRepository choiceRepository;

    @Autowired
    public ChoiceServiceImpl(ChoiceRepository choiceRepository) {
        this.choiceRepository = choiceRepository;
    }
    @Override
    public List<Choice> getAllChoice(Long userId, Long quizId, Long questionId) {
        return choiceRepository.findByQuestion_IdAndQuestion_Quiz_IdAndQuestion_Quiz_User_Id(userId, quizId, questionId);
    }
}
