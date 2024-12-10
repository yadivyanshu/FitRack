package com.tericcabrel.authapi.repository;

import com.tericcabrel.authapi.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByNameContaining(String name);
    List<Event> findByDateBetween(Date startDate, Date endDate);
}