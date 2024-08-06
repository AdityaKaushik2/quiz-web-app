package com.quiz.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {
    @NotBlank(message = "Description is mandatory")
    private String description;
    @NotBlank(message = "Name is mandatory")
    private String name;
}