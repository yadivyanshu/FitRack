package com.tericcabrel.authapi.controller;

import com.tericcabrel.authapi.entities.Group;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping("/create")
    public ResponseEntity<Group> createGroup(@RequestParam String name, @RequestParam Integer userId) {
        try {
            Group group = groupService.createGroup(name, userId);
            if (group != null) {
                return ResponseEntity.ok(group);
            }
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/join")
    public ResponseEntity<Group> joinGroup(@RequestParam Integer groupId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = ((UserDetails) authentication.getPrincipal()).getUsername();
            Group group = groupService.joinGroup(groupId, userEmail);
            if (group != null) {
                return ResponseEntity.ok(group);
            }
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<Group> getGroup(@PathVariable Integer groupId) {
        try {
            Group group = groupService.getGroup(groupId);
            if (group != null) {
                return ResponseEntity.ok(group);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<User>> getGroupMembers(@PathVariable Integer groupId) {
        try {
            List<User> members = groupService.getGroupMembers(groupId);
            if (members != null) {
                return ResponseEntity.ok(members);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
