package com.quiz.backend.dto;

import lombok.Data;

@Data
public class QuizResponseDTO {

    private Long id;

    private String name;

    private String description;

    private String code;
}
