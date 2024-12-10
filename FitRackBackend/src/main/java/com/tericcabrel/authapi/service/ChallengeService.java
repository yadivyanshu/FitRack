package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.dao.ChallengeDto;
import com.tericcabrel.authapi.dao.UserDto;
import com.tericcabrel.authapi.entities.Challenge;
import com.tericcabrel.authapi.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChallengeService {
    @Autowired
    private ChallengeRepository challengeRepository;

    public List<ChallengeDto> getAllChallenges() {
        return challengeRepository.findAll().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    private ChallengeDto convertToDto(Challenge challenge) {
        ChallengeDto challengeDto = new ChallengeDto();
        challengeDto.setId(challenge.getId());
        challengeDto.setName(challenge.getName());
        challengeDto.setDescription(challenge.getDescription());
        challengeDto.setStartDate(challenge.getStartDate());
        challengeDto.setEndDate(challenge.getEndDate());
        challengeDto.setParticipants(challenge.getParticipants().stream()
            .map(user -> {
                UserDto userDto = new UserDto();
                userDto.setId(user.getId());
                userDto.setUsername(user.getUsername());
                return userDto;
            })
            .collect(Collectors.toSet()));
        return challengeDto;
    }

    public Challenge createChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }
}
