package com.quiz.backend.service;

import com.quiz.backend.dto.ChoiceDTO;
import com.quiz.backend.entity.Choice;
import com.quiz.backend.entity.Question;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.repository.ChoiceRepository;
import com.quiz.backend.repository.QuestionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChoiceServiceImpl implements ChoiceService {

    private final ChoiceRepository choiceRepository;
    private final QuestionRepository questionRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ChoiceServiceImpl(ChoiceRepository choiceRepository, QuestionRepository questionRepository, ModelMapper modelMapper) {
        this.choiceRepository = choiceRepository;
        this.questionRepository = questionRepository;
        this.modelMapper = modelMapper;
    }
    @Override
    public List<ChoiceDTO> getAllChoice(Long userId, Long quizId, Long questionId) {

        List<Choice> choices = choiceRepository.findByQuestion_IdAndQuestion_Quiz_IdAndQuestion_Quiz_User_Id(questionId, quizId, userId);

        return choices.stream()
                .map(choice -> modelMapper.map(choice, ChoiceDTO.class))
                .collect(java.util.stream.Collectors.toList());
    }

    @Override
    public Choice saveChoice(Long userId, Long quizId, Long questionId, Choice choice) {

        Question question = questionRepository.findByQuiz_IdAndQuiz_User_IdAndId(quizId,userId,questionId);

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

    @Override
    public Choice updateChoice(Long userId, Long quizId, Long questionId, Long choiceId, Choice newChoice) {
        Choice oldChoice = choiceRepository.findByIdAndQuestion_IdAndQuestion_Quiz_IdAndQuestion_Quiz_User_Id(choiceId, questionId, quizId, userId);
        if (oldChoice == null){
            throw new QuizNotFoundException("Choice Not Found");
        }
        oldChoice.setContent(newChoice.getContent());
        oldChoice.setCorrect(newChoice.isCorrect());
        return choiceRepository.save(oldChoice);
    }
}
