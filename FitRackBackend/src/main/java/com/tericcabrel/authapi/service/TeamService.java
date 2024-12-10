package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.entities.Event;
import com.tericcabrel.authapi.entities.Team;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repository.EventRepository;
import com.tericcabrel.authapi.repository.TeamRepository;
import com.tericcabrel.authapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<Team> findAll() {
        return teamRepository.findAll();
    }

    public Optional<Team> findById(Integer id) {
        return teamRepository.findById(id);
    }

    @Transactional
    public Team createTeam(Team team) {
        Optional<User> createdBy = userRepository.findById(team.getCreatedBy().getId());
        Optional<Event> event = eventRepository.findById(team.getEvent().getId());

        if (createdBy.isPresent() && event.isPresent()) {
            team.setCreatedBy(createdBy.get());
            team.setEvent(event.get());
            return teamRepository.save(team);
        } else {
            throw new RuntimeException("User or Event not found");
        }
    }

    @Transactional
    public Team updateTeam(Integer teamId, Team teamDetails) {
        Optional<Team> teamOptional = teamRepository.findById(teamId);

        if (teamOptional.isPresent()) {
            Team team = teamOptional.get();
            team.setName(teamDetails.getName());
            team.setEvent(teamDetails.getEvent());
            team.setCreatedBy(teamDetails.getCreatedBy());
            return teamRepository.save(team);
        } else {
            throw new RuntimeException("Team not found");
        }
    }

    public void deleteById(Integer id) {
        teamRepository.deleteById(id);
    }

    @Transactional
    public void addUserToTeam(Integer teamId, String userEmail) {
        Optional<Team> team = teamRepository.findById(teamId);
        Optional<User> user = userRepository.findByEmail(userEmail);

        if (team.isPresent() && user.isPresent()) {
            Team teamEntity = team.get();
            User userEntity = user.get();

            // Check if the team already has 10 members
            if (teamEntity.getMembers().size() >= 10) {
                throw new RuntimeException("Team already has 10 members");
            }

            // Check if the user is already a member of the team
            if (!teamEntity.getMembers().contains(userEntity)) {
                teamEntity.getMembers().add(userEntity);
                teamRepository.save(teamEntity);
            } else {
                throw new RuntimeException("User is already a member of the team");
            }
        } else {
            throw new RuntimeException("Team or User not found");
        }
    }
}
