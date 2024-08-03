package com.quiz.backend.controller;

import com.quiz.backend.entity.Choice;
import com.quiz.backend.service.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Choice> getAllChoice(@PathVariable Long userId, @PathVariable Long quizId, @PathVariable Long questionId) {
        return choiceService.getAllChoice(userId, quizId, questionId);
    }

    @PostMapping("/choice")
    public Choice saveChoice(@PathVariable Long userId, @PathVariable Long quizId, @PathVariable Long questionId, @RequestBody Choice choice) {
        return choiceService.saveChoice(userId, quizId, questionId, choice);
    }
}
