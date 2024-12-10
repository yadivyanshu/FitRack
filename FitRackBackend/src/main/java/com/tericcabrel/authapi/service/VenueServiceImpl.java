package com.tericcabrel.authapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tericcabrel.authapi.entities.Venue;
import com.tericcabrel.authapi.repository.VenueRepository;

@Service
public class VenueServiceImpl implements VenueService {

    @Autowired
    private VenueRepository venueRepository;

    @Override
    public Venue save(Venue venue) {
        return venueRepository.save(venue);
    }

    @Override
    public Venue update(Venue venue) {
        return venueRepository.save(venue);
    }

    @Override
    public void deleteById(Integer id) {
        venueRepository.deleteById(id);
    }

    @Override
    public Venue findById(Integer id) {
        Optional<Venue> optionalVenue = venueRepository.findById(id);
        return optionalVenue.orElseThrow();
    }

    @Override
    public List<Venue> findAll() {
        return venueRepository.findAll();
    }

    
}