package com.tericcabrel.authapi.repository;

import com.tericcabrel.authapi.entities.Role;
import com.tericcabrel.authapi.entities.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(RoleEnum name);
}
