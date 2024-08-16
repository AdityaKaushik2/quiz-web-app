package com.quiz.backend.repository;

import com.quiz.backend.entity.UserQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserQuizRepository extends JpaRepository<UserQuiz, Long> {
    List<UserQuiz> findByUserId(Long userId);
    List<UserQuiz> findByQuizId(Long quizId);
    Optional<UserQuiz> findByUserIdAndQuizId(Long userId, Long quizId);
}
