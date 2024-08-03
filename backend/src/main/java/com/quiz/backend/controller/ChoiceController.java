package com.quiz.backend.controller;

import com.quiz.backend.entity.Choice;
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
    public ResponseEntity<List<Choice>> getAllChoice(@PathVariable Long userId, @PathVariable Long quizId, @PathVariable Long questionId) {
        List<Choice> choices = choiceService.getAllChoice(userId, quizId, questionId);
        return new ResponseEntity<>(choices, HttpStatus.OK);
    }

    @PostMapping("/choice")
    public ResponseEntity<Choice> saveChoice(@PathVariable Long userId, @PathVariable Long quizId, @PathVariable Long questionId, @RequestBody Choice choice) {
        try {
            Choice savedChoice = choiceService.saveChoice(userId, quizId, questionId, choice);
            return new ResponseEntity<>(savedChoice, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
