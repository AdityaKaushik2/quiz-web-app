package com.quiz.backend.controller;

import com.quiz.backend.entity.Question;
import com.quiz.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/{userId}/quiz/{quizId}")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService){
        this.questionService = questionService;
    }

    @GetMapping()
    public List<Question> getAllQuestion(@PathVariable Long quizId, @PathVariable Long userId){
        return questionService.getAllQuestion(quizId, userId);
    }

    @PostMapping("/questions")
    public Question saveQuestion(@PathVariable Long quizId, @PathVariable Long userId, @RequestBody Question newQuestion){
        return questionService.saveQuestion(quizId,userId,newQuestion);
    }
}
