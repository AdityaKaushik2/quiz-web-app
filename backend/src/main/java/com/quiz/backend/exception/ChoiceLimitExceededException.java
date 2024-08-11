package com.quiz.backend.exception;

public class ChoiceLimitExceededException extends RuntimeException {
    public ChoiceLimitExceededException(String message) {
        super(message);
    }
}
