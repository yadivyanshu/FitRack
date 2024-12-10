package com.tericcabrel.authapi.repository;

import com.tericcabrel.authapi.entities.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Integer> {
}
