package com.quiz.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceDTO {
    private Long id;
    @NotBlank(message = "Content is mandatory")
    private String content;
    @NotBlank(message = "Correct is mandatory")
    private boolean correct;
}
