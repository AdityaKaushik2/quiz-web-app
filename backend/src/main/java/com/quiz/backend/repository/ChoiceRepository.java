package com.quiz.backend.repository;

import com.quiz.backend.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {
    List<Choice> findByQuestion_Id(Long questionId);

    List<Choice> findByQuestion_IdAndQuestion_Quiz_Id(Long questionId, Long quizId);

    List<Choice> findByQuestion_IdAndQuestion_Quiz_IdAndQuestion_Quiz_User_Id(Long questionId, Long quizId, Long userId);

    Choice findByIdAndQuestion_IdAndQuestion_Quiz_IdAndQuestion_Quiz_User_Id(Long choiceId, Long questionId, Long quizId, Long userId);

    void deleteByQuestion_Id(Long questionId);
}
