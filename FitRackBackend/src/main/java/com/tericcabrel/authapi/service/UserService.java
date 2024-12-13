package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.dao.RegisterUserDto;
import com.tericcabrel.authapi.entities.Role;
import com.tericcabrel.authapi.entities.RoleEnum;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repository.RoleRepository;
import com.tericcabrel.authapi.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;
    

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public User createAdministrator(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);

        if (optionalRole.isEmpty()) {
            return null;
        }

        var user = new User()
                .setFullName(input.getFullName())
                .setEmail(input.getEmail())
                .setPassword(passwordEncoder.encode(input.getPassword()))
                .setRole(optionalRole.get());

        return userRepository.save(user);
    }

    @Transactional
    public void followUser(Integer userId, Integer followerId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<User> follower = userRepository.findById(followerId);


        if (user.isPresent() && follower.isPresent()) {
            user.get().getFollowers().add(follower.get());
            userRepository.save(user.get());
        } else {
            throw new RuntimeException("User or Follower not found");
        }
    }

    @Transactional
    public void unfollowUser(Integer userId, Integer followerId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<User> follower = userRepository.findById(followerId);

        if (user.isPresent() && follower.isPresent()) {
            user.get().getFollowers().remove(follower.get());
            userRepository.save(user.get());
        } else {
            throw new RuntimeException("User or Follower not found");
        }
    }

    public int getLoginCount(int id) {
        return userRepository.findById(id).get().getLoginCount();
    }
}
