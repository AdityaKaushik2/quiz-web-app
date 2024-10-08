package com.quiz.backend.controller;

import com.quiz.backend.dto.ChoiceDTO;
import com.quiz.backend.entity.Choice;
import com.quiz.backend.exception.ChoiceLimitExceededException;
import com.quiz.backend.service.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/{userId}/quiz/{quizId}/question/{questionId}")
public class ChoiceController {

    private final ChoiceService choiceService;

    @Autowired
    public ChoiceController(ChoiceService choiceService) {
        this.choiceService = choiceService;
    }

    @GetMapping("/choice")
    public ResponseEntity<List<ChoiceDTO>> getAllChoice(@PathVariable Long userId, @PathVariable Long quizId, @PathVariable Long questionId) {
        try {
            List<ChoiceDTO> choices = choiceService.getAllChoice(userId, quizId, questionId);
            if (choices.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(choices, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/choice")
    public ResponseEntity<?> saveChoice(@PathVariable Long userId, @PathVariable Long quizId,
                                        @PathVariable Long questionId, @RequestBody Choice choice) {
        try {
            Choice savedChoice = choiceService.saveChoice(userId, quizId, questionId, choice);
            return new ResponseEntity<>(savedChoice, HttpStatus.CREATED);
        } catch (ChoiceLimitExceededException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/choice/{choiceId}")
    public ResponseEntity<Void> deleteChoice(@PathVariable Long userId, @PathVariable Long quizId, @PathVariable Long questionId, @PathVariable Long choiceId) {
        try {
            choiceService.deleteChoice(userId, quizId, questionId, choiceId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/choice/{choiceId}")
    public ResponseEntity<Choice> updateChoice(@PathVariable Long userId, @PathVariable Long quizId, @PathVariable Long questionId, @PathVariable Long choiceId, @RequestBody Choice newChoice) {
        try {
            Choice updatedChoice = choiceService.updateChoice(userId, quizId, questionId, choiceId, newChoice);
            return new ResponseEntity<>(updatedChoice, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
