package com.tericcabrel.authapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tericcabrel.authapi.entities.Venue;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Integer> {
}
