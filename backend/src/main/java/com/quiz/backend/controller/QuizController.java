package com.quiz.backend.controller;

import com.quiz.backend.entity.Quiz;
import com.quiz.backend.exception.QuizNotFoundException;
import com.quiz.backend.exception.UserNotFoundException;
import com.quiz.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QuizController {
    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<List<Quiz>> getQuizList(@PathVariable Long id) {
        List<Quiz> quizzes = quizService.getAllQuiz(id);
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @PostMapping("/{id}/quiz")
    public ResponseEntity<Quiz> saveQuiz(@RequestBody Quiz newQuiz, @PathVariable Long id) {
        Quiz savedQuiz = quizService.saveQuiz(newQuiz, id);
        return new ResponseEntity<>(savedQuiz, HttpStatus.CREATED);
    }

    @DeleteMapping("user/{userId}/quiz/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long quizId, @PathVariable Long userId) {
        try {
            quizService.deleteQuiz(quizId, userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (QuizNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("user/{userId}/quiz/{quizId}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long quizId, @PathVariable Long userId, @RequestBody Quiz updatedQuiz) {
        try {
            Quiz quiz = quizService.updateQuiz(quizId, userId, updatedQuiz);
            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } catch (QuizNotFoundException | UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
