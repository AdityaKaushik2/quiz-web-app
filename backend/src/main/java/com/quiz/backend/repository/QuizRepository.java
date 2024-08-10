package com.quiz.backend.repository;

import com.quiz.backend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByUser_Id(Long userId);

    Optional<Quiz> findByIdAndUser_Id(Long id, Long userId);

    void deleteByUser_Id(Long id);

    boolean existsByCode(String code);

    Optional<Quiz> findByCode(String code);
}
