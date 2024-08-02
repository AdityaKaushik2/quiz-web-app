package com.quiz.backend.service;

import com.quiz.backend.entity.Question;
import com.quiz.backend.repository.QuestionRepository;

import java.util.List;

public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository){
        this.questionRepository = questionRepository;
    }
    @Override
    public List<Question> getAllQuestion(Long id) {
        return questionRepository.findByQuiz_Id(id);
    }
}
