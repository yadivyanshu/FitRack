package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.entities.Discussion;
import com.tericcabrel.authapi.entities.Group;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repository.DiscussionRepository;
import com.tericcabrel.authapi.repository.GroupRepository;
import com.tericcabrel.authapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscussionService {

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    public Discussion createDiscussion(String message, Integer groupId, Integer userId) {
        Optional<Group> group = groupRepository.findById(groupId);
        Optional<User> user = userRepository.findById(userId);

        if (group.isPresent() && user.isPresent()) {
            Group groupEntity = group.get();
            User userEntity = user.get();

            // Check if the user is a member of the group
            if (groupEntity.getMembers().contains(userEntity)) {
                Discussion discussion = new Discussion();
                discussion.setMessage(message);
                discussion.setGroup(groupEntity);
                discussion.setUser(userEntity);
                return discussionRepository.save(discussion);
            }
        }
        return null;
    }

    public Discussion getDiscussion(Integer discussionId) {
        return discussionRepository.findById(discussionId).orElse(null);
    }
    public List<Discussion> getAllDiscussions() {
        return discussionRepository.findAll();
    }
}
