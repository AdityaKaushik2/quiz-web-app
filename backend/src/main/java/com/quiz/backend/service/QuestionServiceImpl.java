package com.quiz.backend.service;

import com.quiz.backend.entity.Choice;
import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.repository.ChoiceRepository;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final ChoiceRepository choiceRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository, QuizRepository quizRepository, ChoiceRepository choiceRepository) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
        this.choiceRepository = choiceRepository;
    }

    @Override
    public List<Question> getAllQuestion(Long quizId, Long userId) {
        return questionRepository.findByQuiz_IdAndQuiz_User_Id(quizId, userId);
    }

    @Override
    public Question saveQuestion(Long quizId, Long userId, Question newQuestion) {

        Quiz quiz = quizRepository.findByIdAndUser_Id(quizId, userId).orElseThrow(() -> new QuizNotFoundException("Quiz Not Found"));
        newQuestion.setQuiz(quiz);
        return questionRepository.save(newQuestion);
    }

    @Override
    public Question updateQuestion(Long userId, Long quizId, Long questionId, Question question) {
        Question existingQuestion = questionRepository.findByQuiz_IdAndQuiz_User_IdAndId(quizId, userId, questionId);
        existingQuestion.setContent(question.getContent());
        existingQuestion.setUpdatedAt(LocalDateTime.now());
        existingQuestion.setVersion(existingQuestion.getVersion() + 1);
        return questionRepository.save(existingQuestion);
    }

    @Override
    public void deleteQuestion(Long userId, Long quizId, Long questionId) {
        Question question = questionRepository.findByQuiz_IdAndQuiz_User_IdAndId(quizId, userId, questionId);

        //delete all choices associated with the question
        List<Choice> choice = choiceRepository.findByQuestion_Id(questionId);
        choiceRepository.deleteByQuestion_Id(questionId);

        //delete the question
        questionRepository.delete(question);
    }
}
