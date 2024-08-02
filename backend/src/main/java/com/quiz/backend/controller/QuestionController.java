package com.quiz.backend.controller;

import com.quiz.backend.entity.Question;
import com.quiz.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService){
        this.questionService = questionService;
    }

    @GetMapping("/user/{userId}/quiz/{quizId}")
    public List<Question> getAllQuestion(@PathVariable Long quizId, @PathVariable Long userId){
        return questionService.getAllQuestion(quizId, userId);
    }
}
