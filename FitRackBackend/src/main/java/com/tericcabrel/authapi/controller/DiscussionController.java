package com.tericcabrel.authapi.controller;

import com.tericcabrel.authapi.dao.DiscussionRequest;
import com.tericcabrel.authapi.entities.Discussion;
import com.tericcabrel.authapi.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {

    @Autowired
    private DiscussionService discussionService;

    @PostMapping("/create")
    public ResponseEntity<Discussion> createDiscussion(@RequestBody DiscussionRequest discussionRequest) {
        try {
            Discussion discussion = discussionService.createDiscussion(discussionRequest.getMessage(), discussionRequest.getGroupId(), discussionRequest.getUserId());
            if (discussion != null) {
                return ResponseEntity.ok(discussion);
            }
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{discussionId}")
    public ResponseEntity<Discussion> getDiscussion(@PathVariable Integer discussionId) {
        try {
            Discussion discussion = discussionService.getDiscussion(discussionId);
            if (discussion != null) {
                return ResponseEntity.ok(discussion);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Discussion>> getAllDiscussions() {
        try {
            List<Discussion> discussions = discussionService.getAllDiscussions();
            return ResponseEntity.ok(discussions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
