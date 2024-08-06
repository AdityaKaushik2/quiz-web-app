package com.quiz.backend.service;

import com.quiz.backend.dto.QuestionDTO;
import com.quiz.backend.entity.Choice;
import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.exception.QuestionNotFoundException;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.repository.ChoiceRepository;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final ChoiceRepository choiceRepository;
    private final ModelMapper modelMapper;

    public QuestionServiceImpl(QuestionRepository questionRepository, QuizRepository quizRepository, ChoiceRepository choiceRepository, ModelMapper modelMapper) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
        this.choiceRepository = choiceRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<QuestionDTO> getAllQuestion(Long quizId, Long userId) {
        List<Question> questions=  questionRepository.findByQuiz_IdAndQuiz_User_Id(quizId, userId);

        return questions.stream()
                .map(question -> modelMapper.map(question, QuestionDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Question saveQuestion(Long quizId, Long userId, QuestionDTO newQuestion) {

        Quiz quiz = quizRepository.findByIdAndUser_Id(quizId, userId).orElseThrow(() -> new QuizNotFoundException("Quiz Not Found"));
        Question question = modelMapper.map(newQuestion, Question.class);
        question.setCreatedAt(LocalDateTime.now());
        question.setUpdatedAt(LocalDateTime.now());
        question.setVersion(1);
        question.setQuiz(quiz);
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Long userId, Long quizId, Long questionId, QuestionDTO question) {
        Question existingQuestion = questionRepository.findByQuiz_IdAndQuiz_User_IdAndId(quizId, userId, questionId);
        existingQuestion.setContent(question.getContent());
        existingQuestion.setUpdatedAt(LocalDateTime.now());
        existingQuestion.setVersion(existingQuestion.getVersion() + 1);
        return questionRepository.save(existingQuestion);
    }

    @Override
    public void deleteQuestion(Long userId, Long quizId, Long questionId) {
        Question question = questionRepository.findByQuiz_IdAndQuiz_User_IdAndId(quizId, userId, questionId);
        if (question == null) {
            throw new QuestionNotFoundException("Question not found");
        }

        // Delete all choices associated with the question
        List<Choice> choices = choiceRepository.findByQuestion_Id(questionId);
        choiceRepository.deleteAll(choices);

        // Delete the question
        questionRepository.delete(question);
    }
}
