package com.tericcabrel.authapi.repository;

import com.tericcabrel.authapi.entities.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Integer> {
}