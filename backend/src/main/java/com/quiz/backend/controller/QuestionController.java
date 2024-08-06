package com.quiz.backend.controller;

import com.quiz.backend.dto.QuestionDTO;
import com.quiz.backend.entity.Question;
import com.quiz.backend.exception.QuestionNotFoundException;
import com.quiz.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/{userId}/quiz/{quizId}")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getAllQuestion(@PathVariable Long quizId, @PathVariable Long userId) {
        List<QuestionDTO> questions = questionService.getAllQuestion(quizId, userId);
        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping("/questions")
    public ResponseEntity<Question> saveQuestion(@PathVariable Long quizId, @PathVariable Long userId, @RequestBody QuestionDTO newQuestion) {
        Question savedQuestion = questionService.saveQuestion(quizId, userId, newQuestion);
        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }

    @PutMapping("/questions/{questionId}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long quizId, @PathVariable Long userId, @PathVariable Long questionId, @RequestBody QuestionDTO question) {
        try {
            Question updatedQuestion = questionService.updateQuestion(userId, quizId, questionId, question);
            return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long userId, @PathVariable Long quizId, @PathVariable Long questionId) {
        try {
            questionService.deleteQuestion(userId, quizId, questionId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (QuestionNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
