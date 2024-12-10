package com.tericcabrel.authapi.service;

import java.util.List;

import com.tericcabrel.authapi.entities.Event;

public interface EventService {
    Event save(Event event);
    Event update(Event event);
    void deleteById(Integer id);
    Event findById(Integer id);
    List<Event> findAll();
}