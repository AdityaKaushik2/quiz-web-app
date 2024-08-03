package com.quiz.backend.repository;

import com.quiz.backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuiz_Id(Long quizId);
    List<Question> findByQuiz_IdAndQuiz_User_Id(Long quizId, Long userId);
    Question findByQuiz_IdAndQuiz_User_IdAndId(Long quizId, Long userId, Long questionId);
}
