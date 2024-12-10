package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.entities.Group;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repository.GroupRepository;
import com.tericcabrel.authapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Group createGroup(String name, Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Group group = new Group();
            group.setName(name);
            group.setCreatedBy(user.get());
            return groupRepository.save(group);
        }
        return null;
    }

    @Transactional
    public Group joinGroup(Integer groupId, String userEmail) {
        Optional<Group> group = groupRepository.findById(groupId);
        Optional<User> user = userRepository.findByEmail(userEmail);
        if (group.isPresent() && user.isPresent()) {
            Group groupEntity = group.get();
            User userEntity = user.get();

            // Check if the user is already a member of the group
            if (!groupEntity.getMembers().contains(userEntity)) {
                groupEntity.getMembers().add(userEntity);
                return groupRepository.save(groupEntity);
            } else {
                // User is already a member, return the existing group
                return groupEntity;
            }
        }
        return null;
    }

    public Group getGroup(Integer groupId) {
        return groupRepository.findById(groupId).orElse(null);
    }

    public List<User> getGroupMembers(Integer groupId) {
        Optional<Group> group = groupRepository.findById(groupId);
        if (group.isPresent()) {
            return group.get().getMembers().stream().toList();
        }
        return null;
    }
}
