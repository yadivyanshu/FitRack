package com.tericcabrel.authapi.controller;

import com.tericcabrel.authapi.dao.ChallengeDto;
import com.tericcabrel.authapi.entities.Challenge;
import com.tericcabrel.authapi.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @GetMapping
    public ResponseEntity<List<ChallengeDto>> getAllChallenges() {
        try {
            List<ChallengeDto> challenges = challengeService.getAllChallenges();
            return ResponseEntity.ok(challenges);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Challenge> createChallenge(@RequestBody Challenge challenge) {
        try {
            Challenge createdChallenge = challengeService.createChallenge(challenge);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdChallenge);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
