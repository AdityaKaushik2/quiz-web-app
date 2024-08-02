package com.quiz.backend.service;

import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.User;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Quiz> getAllQuiz(Long id) {
        return quizRepository.findByUser_Id(id);
    }

    @Override
    public Quiz saveQuiz(Quiz newQuiz, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("User Not Found"));
        newQuiz.setUser(user);
        return quizRepository.save(newQuiz);
    }

    @Override
    public void deleteQuiz(Long quizId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("User Not Found"));
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(()->new QuizNotFoundException("Quiz Not Found"));
        if(quiz.getUser().getId().equals(user.getId())){
            quizRepository.deleteById(quizId);
        }
    }

    public Quiz updateQuiz(Long quizId, Long userId, Quiz updatedQuiz) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException("Quiz not found with id: " + quizId));

        if (!quiz.getUser().getId().equals(userId)) {
            throw new UserNotFoundException("User does not have permission to update this quiz");
        }

        quiz.setCode(updatedQuiz.getCode());
        quiz.setDescription(updatedQuiz.getDescription());
        quiz.setName(updatedQuiz.getName());
        quiz.setUpdatedAt(updatedQuiz.getUpdatedAt());
        quiz.setVersion(quiz.getVersion()+1);

        return quizRepository.save(quiz);
    }
}
