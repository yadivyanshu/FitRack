package com.tericcabrel.authapi.controller;

import com.tericcabrel.authapi.entities.Team;
import com.tericcabrel.authapi.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Integer id) {
        Optional<Team> team = teamService.findById(id);
        if (team.isPresent()) {
            return ResponseEntity.ok(team.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        try {
            Team createdTeam = teamService.createTeam(team);
            return ResponseEntity.ok(createdTeam);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Integer id, @RequestBody Team teamDetails) {
        try {
            Team updatedTeam = teamService.updateTeam(id, teamDetails);
            return ResponseEntity.ok(updatedTeam);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTeam(@PathVariable Integer id) {
        if (teamService.findById(id).isPresent()) {
            teamService.deleteById(id);
            return ResponseEntity.ok("Team deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{teamId}/join")
    public ResponseEntity<String> joinTeam(@PathVariable Integer teamId) {
        try {
            // Get the logged-in user's email from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = ((UserDetails) authentication.getPrincipal()).getUsername();

            teamService.addUserToTeam(teamId, userEmail);
            return ResponseEntity.ok("User successfully joined the team");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
