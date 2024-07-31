package com.quiz.backend.repository;

import com.quiz.backend.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoiceRepository extends JpaRepository<Choice,Long> {
}
