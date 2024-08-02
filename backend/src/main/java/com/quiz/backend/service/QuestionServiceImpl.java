package com.quiz.backend.service;

import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository, QuizRepository quizRepository) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    public List<Question> getAllQuestion(Long userId, Long quizId) {
        return questionRepository.findByQuiz_IdAndQuiz_User_Id(quizId, userId);
    }

    @Override
    public Question saveQuestion(Long quizId, Long userId, Question newQuestion) {

        Quiz quiz = quizRepository.findByIdAndUser_Id(quizId, userId).orElseThrow(() -> new QuizNotFoundException("Quiz Not Found"));
        newQuestion.setQuiz(quiz);
        return questionRepository.save(newQuestion);
    }
}
