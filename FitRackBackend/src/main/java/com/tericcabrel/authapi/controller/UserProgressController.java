package com.tericcabrel.authapi.controller;

import com.tericcabrel.authapi.entities.UserProgress;
import com.tericcabrel.authapi.service.UserProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-progress")
public class UserProgressController {
    @Autowired
    private UserProgressService userProgressService;

    @GetMapping
    public List<UserProgress> getAllUserProgress() {
        return userProgressService.getAllUserProgress();
    }

    @PostMapping
    public UserProgress createUserProgress(@RequestBody UserProgress userProgress) {
        return userProgressService.createUserProgress(userProgress);
    }

    
}
