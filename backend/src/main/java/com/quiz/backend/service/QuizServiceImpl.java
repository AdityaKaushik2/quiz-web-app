package com.quiz.backend.service;

import com.quiz.backend.dto.QuizDTO;
import com.quiz.backend.dto.QuizResponseDTO;
import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.User;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.repository.*;
import com.quiz.backend.utils.CodeGenerator;
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
    private final UserQuizRepository userQuizRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository, UserRepository userRepository,
                           QuestionRepository questionRepository,
                           ChoiceRepository choiceRepository,
                           ModelMapper modelMapper,
                           UserQuizRepository userQuizRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.choiceRepository = choiceRepository;
        this.modelMapper = modelMapper;
        this.userQuizRepository = userQuizRepository;
    }

    @Override
    public List<QuizResponseDTO> getAllQuiz(Long userId) {
        List<Quiz> quizzes = quizRepository.findByUser_Id(userId);

        return quizzes.stream()
                .map(quiz -> modelMapper.map(quiz, QuizResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Quiz saveQuiz(QuizDTO newQuiz, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User Not Found"));
        Quiz quiz = modelMapper.map(newQuiz, Quiz.class);
        quiz.setCreatedAt(LocalDateTime.now());
        quiz.setUpdatedAt(LocalDateTime.now());
        quiz.setVersion(1);
        quiz.setCode(generateUniqueCode()); 
        quiz.setUser(user);
        return quizRepository.save(quiz);
    }

    @Override
    @Transactional
    public void deleteQuiz(Long userId, Long quizId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User Not Found"));
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException("Quiz Not Found"));

        if (quiz.getUser().getId().equals(user.getId())) {
            // Find all questions associated with the quiz
            List<Question> questions = questionRepository.findByQuiz_Id(quizId);

            // Delete choices for each question
            for (Question question : questions) {
                choiceRepository.deleteByQuestion_Id(question.getId());
            }

            // Delete all questions for the quiz
            questionRepository.deleteByQuiz_Id(quizId);

            userQuizRepository.deleteByQuizId(quizId);
            // Finally, delete the quiz
            quizRepository.deleteById(quizId);
        }
    }

    public Quiz updateQuiz(Long quizId, Long userId, QuizDTO quizDTO) {
        Quiz existingQuiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException("Quiz not found with id: " + quizId));

        if (!existingQuiz.getUser().getId().equals(userId)) {
            throw new UserNotFoundException("User does not have permission to update this quiz");
        }
        existingQuiz.setCode(existingQuiz.getCode());
        existingQuiz.setDescription(quizDTO.getDescription());
        existingQuiz.setName(quizDTO.getName());
        existingQuiz.setUpdatedAt(LocalDateTime.now());
        existingQuiz.setVersion(existingQuiz.getVersion() + 1);

        return quizRepository.save(existingQuiz);
    }

    @Override
    public QuizResponseDTO getQuiz(String code) {
        Quiz quiz = quizRepository.findByCode(code)
                .orElseThrow(() -> new QuizNotFoundException("Quiz not found with code: " + code));
        QuizResponseDTO quizResponseDTO = modelMapper.map(quiz, QuizResponseDTO.class);
        quizResponseDTO.setUserId(quiz.getUser().getId());

        return quizResponseDTO;
    }

    private String generateUniqueCode() {
        String code;
        do {
            code = CodeGenerator.generateCode();
        } while (quizRepository.existsByCode(code));
        return code;
    }
}
