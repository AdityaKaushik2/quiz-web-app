package com.quiz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "choices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "is_correct", nullable = false)
    private boolean isCorrect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
}
