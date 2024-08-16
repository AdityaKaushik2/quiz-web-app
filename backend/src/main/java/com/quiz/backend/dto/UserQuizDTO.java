package com.quiz.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserQuizDTO {

    private Long id;

    private LocalDateTime completedAt;

    private int score;

    private QuizDTO quiz;

    private UserDTO user;
}