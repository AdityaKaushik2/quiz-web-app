package com.quiz.backend.controller;

import com.quiz.backend.entity.Quiz;
import com.quiz.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QuizController {
    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService){
        this.quizService = quizService;
    }

    @GetMapping("/quiz/{id}")
    public List<Quiz> getQuizList(@PathVariable Long id){
        return quizService.getAllQuiz(id);
    }

    @PostMapping("/{id}/quiz")
    public Quiz saveQuiz(@RequestBody Quiz newQuiz, @PathVariable Long id){
        return quizService.saveQuiz(newQuiz,id);
    }

    @DeleteMapping("user/{userId}/quiz/{quizId}")
    public void deleteQuiz(@PathVariable Long quizId, @PathVariable Long userId){
        quizService.deleteQuiz(quizId,userId);
    }
}
