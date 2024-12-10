package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.entities.UserProgress;
import com.tericcabrel.authapi.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProgressService {
    @Autowired
    private UserProgressRepository userProgressRepository;

    public List<UserProgress> getAllUserProgress() {
        return userProgressRepository.findAll();
    }

    public UserProgress createUserProgress(UserProgress userProgress) {
        return userProgressRepository.save(userProgress);
    }

}
