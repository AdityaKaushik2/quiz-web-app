package com.quiz.backend.service;

import com.quiz.backend.entity.Choice;
import com.quiz.backend.entity.Question;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.repository.ChoiceRepository;
import com.quiz.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChoiceServiceImpl implements ChoiceService {

    private final ChoiceRepository choiceRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public ChoiceServiceImpl(ChoiceRepository choiceRepository, QuestionRepository questionRepository) {
        this.choiceRepository = choiceRepository;
        this.questionRepository = questionRepository;
    }
    @Override
    public List<Choice> getAllChoice(Long userId, Long quizId, Long questionId) {
        return choiceRepository.findByQuestion_IdAndQuestion_Quiz_IdAndQuestion_Quiz_User_Id(userId, quizId, questionId);
    }

    @Override
    public Choice saveChoice(Long userId, Long quizId, Long questionId, Choice choice) {

        Question question = questionRepository.findByQuiz_IdAndQuiz_User_IdAndId(questionId,quizId,userId);

        if (question == null){
            throw new RuntimeException("Question Not Found  ");
        }
        choice.setQuestion(question);
        return choiceRepository.save(choice);
    }

    @Override
    public void deleteChoice(Long userId, Long quizId, Long questionId, Long choiceId) {
        Choice choice = choiceRepository.findByIdAndQuestion_IdAndQuestion_Quiz_IdAndQuestion_Quiz_User_Id(choiceId, questionId, quizId, userId);
        if (choice == null){
            throw new QuizNotFoundException("Choice Not Found");
        }
        choiceRepository.delete(choice);
    }
}
