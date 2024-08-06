package com.quiz.backend.service;

import com.quiz.backend.dto.QuizDTO;
import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.User;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.repository.ChoiceRepository;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final ChoiceRepository choiceRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository, UserRepository userRepository,
                           QuestionRepository questionRepository,
                           ChoiceRepository choiceRepository,
                           ModelMapper modelMapper) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.choiceRepository = choiceRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<QuizDTO> getAllQuiz(Long userId) {
        List<Quiz> quizzes = quizRepository.findByUser_Id(userId);

        return quizzes.stream()
                .map(quiz -> modelMapper.map(quiz, QuizDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Quiz saveQuiz(QuizDTO newQuiz, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User Not Found"));
        Quiz quiz = modelMapper.map(newQuiz, Quiz.class);
        quiz.setCreatedAt(LocalDateTime.now());
        quiz.setUpdatedAt(LocalDateTime.now());
        quiz.setVersion(1);
        quiz.setCode(Math.random() + " "); //random code for testing
        quiz.setUser(user);
        return quizRepository.save(quiz);
    }

    @Override
    @Transactional
    public void deleteQuiz(Long quizId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User Not Found"));
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException("Quiz Not Found"));

        if (quiz.getUser().getId().equals(user.getId())) {
            List<Question> questions = questionRepository.findByQuiz_Id(quizId);
            for (Question question : questions) {
                choiceRepository.deleteByQuestion_Id(question.getId());
            }
            questionRepository.deleteByQuiz_Id(quizId);
            quizRepository.deleteById(quizId);
        }
    }

    public Quiz updateQuiz(Long quizId, Long userId, QuizDTO quizDTO) {
        Quiz existingQuiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException("Quiz not found with id: " + quizId));

        if (!existingQuiz.getUser().getId().equals(userId)) {
            throw new UserNotFoundException("User does not have permission to update this quiz");
        }
        existingQuiz.setCode(Math.random() + " "); //random code for testing
        existingQuiz.setDescription(quizDTO.getDescription());
        existingQuiz.setName(quizDTO.getName());
        existingQuiz.setUpdatedAt(LocalDateTime.now());
        existingQuiz.setVersion(existingQuiz.getVersion() + 1);

        return quizRepository.save(existingQuiz);
    }
}
