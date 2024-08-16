package com.quiz.backend.controller;

import com.quiz.backend.dto.UserQuizDTO;
import com.quiz.backend.entity.UserQuiz;
import com.quiz.backend.service.UserQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-quiz")
public class UserQuizController {

    private final UserQuizService userQuizService;

    @Autowired
    public UserQuizController(UserQuizService userQuizService) {
        this.userQuizService = userQuizService;
    }

    @PostMapping("/store")
    public ResponseEntity<UserQuiz> storeUserQuiz(@RequestBody UserQuiz userQuiz) {
        UserQuiz savedUserQuiz = userQuizService.saveUserQuiz(userQuiz);
        return ResponseEntity.ok(savedUserQuiz);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserQuizById(@PathVariable Long id) {
        UserQuizDTO userQuiz = userQuizService.getUserQuizById(id);
        if (userQuiz == null) {
            return new ResponseEntity<>("UserQuiz not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userQuiz, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserQuiz>> getUserQuizzesByUserId(@PathVariable Long userId) {
        List<UserQuiz> userQuizzes = userQuizService.getUserQuizzesByUserId(userId);
        return ResponseEntity.ok(userQuizzes);
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<UserQuiz>> getUserQuizzesByQuizId(@PathVariable Long quizId) {
        List<UserQuiz> userQuizzes = userQuizService.getUserQuizzesByQuizId(quizId);
        return ResponseEntity.ok(userQuizzes);
    }

    @GetMapping("/user/{userId}/quiz/{quizId}")
    public ResponseEntity<UserQuiz> getUserQuizByUserIdAndQuizId(@PathVariable Long userId, @PathVariable Long quizId) {
        Optional<UserQuiz> userQuiz = userQuizService.getUserQuizByUserIdAndQuizId(userId, quizId);
        return userQuiz.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
