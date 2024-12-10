package com.tericcabrel.authapi.service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tericcabrel.authapi.entities.Event;
import com.tericcabrel.authapi.repository.EventRepository;


@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    
    public List<Event> searchEventsByName(String name) {
        return eventRepository.findByNameContaining(name);
    }

    public List<Event> filterEventsByDateRange(Date startDate, Date endDate) {
        return eventRepository.findByDateBetween(startDate, endDate);
    }


    @Override
    public Event save(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event update(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public void deleteById(Integer id) {
        eventRepository.deleteById(id);
    }

    @Override
    public Event findById(Integer id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        return optionalEvent.orElseThrow();
    }

    @Override
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    
}