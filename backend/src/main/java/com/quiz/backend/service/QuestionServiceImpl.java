package com.quiz.backend.service;

import com.quiz.backend.entity.Question;
import com.quiz.backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository){
        this.questionRepository = questionRepository;
    }
    @Override
    public List<Question> getAllQuestion(Long userId, Long quizId) {
        return questionRepository.findByQuiz_IdAndQuiz_User_Id(quizId, userId);
    }
}
