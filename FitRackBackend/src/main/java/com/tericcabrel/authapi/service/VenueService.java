package com.tericcabrel.authapi.service;

import java.util.List;

import com.tericcabrel.authapi.entities.Venue;

public interface VenueService {
    Venue save(Venue venue);
    Venue update(Venue venue);
    void deleteById(Integer id);
    Venue findById(Integer id);
    List<Venue> findAll();
}