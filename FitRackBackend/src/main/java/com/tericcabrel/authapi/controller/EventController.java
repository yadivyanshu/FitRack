package com.tericcabrel.authapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tericcabrel.authapi.entities.Event;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.entities.Venue;
import com.tericcabrel.authapi.repository.EventRepository;
import com.tericcabrel.authapi.repository.UserRepository;
import com.tericcabrel.authapi.repository.VenueRepository;
import com.tericcabrel.authapi.service.EventServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventServiceImpl eventService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> createEvent(@RequestBody String eventJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(eventJson);

            if (!jsonNode.has("name") || jsonNode.get("name").asText().isEmpty()) {
                return ResponseEntity.badRequest().body("Name field is required");
            }
            if (!jsonNode.has("date") || jsonNode.get("date").asText().isEmpty()) {
                return ResponseEntity.badRequest().body("Date field is required");
            }
            if (!jsonNode.has("startTime") || jsonNode.get("startTime").asText().isEmpty()) {
                return ResponseEntity.badRequest().body("Start time field is required");
            }
            if (!jsonNode.has("endTime") || jsonNode.get("endTime").asText().isEmpty()) {
                return ResponseEntity.badRequest().body("End time field is required");
            }
            if (!jsonNode.has("venue") || !jsonNode.get("venue").has("id")) {
                return ResponseEntity.badRequest().body("Venue ID is required");
            }
            if (!jsonNode.has("user") || !jsonNode.get("user").has("id")) {
                return ResponseEntity.badRequest().body("User ID is required");
            }

            Event event = new Event();
            event.setName(jsonNode.get("name").asText());
            event.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(jsonNode.get("date").asText()));
            event.setStartTime(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(jsonNode.get("startTime").asText()));
            event.setEndTime(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(jsonNode.get("endTime").asText()));

            int venueId = jsonNode.get("venue").get("id").asInt();
            Optional<Venue> venue = venueRepository.findById(venueId);
            if (venue.isPresent()) {
                event.setVenue(venue.get());
            } else {
                return ResponseEntity.badRequest().body("Venue not found");
            }

            int userId = jsonNode.get("user").get("id").asInt();
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                event.setUser(user.get());
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }

            eventRepository.save(event);
            return ResponseEntity.ok(event);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> updateEvent(@PathVariable Integer id, @RequestBody String eventJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(eventJson);

            Optional<Event> existingEvent = eventRepository.findById(id);
            if (!existingEvent.isPresent()) {
                return ResponseEntity.badRequest().body("Event not found");
            }

            Event event = existingEvent.get();
            if (jsonNode.has("name")) {
                event.setName(jsonNode.get("name").asText());
            }
            if (jsonNode.has("date")) {
                event.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(jsonNode.get("date").asText()));
            }
            if (jsonNode.has("startTime")) {
                event.setStartTime(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(jsonNode.get("startTime").asText()));
            }
            if (jsonNode.has("endTime")) {
                event.setEndTime(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(jsonNode.get("endTime").asText()));
            }
            if (jsonNode.has("venue") && jsonNode.get("venue").has("id")) {
                int venueId = jsonNode.get("venue").get("id").asInt();
                Optional<Venue> venue = venueRepository.findById(venueId);
                if (venue.isPresent()) {
                    event.setVenue(venue.get());
                } else {
                    return ResponseEntity.badRequest().body("Venue not found");
                }
            }
            if (jsonNode.has("user") && jsonNode.get("user").has("id")) {
                int userId = jsonNode.get("user").get("id").asInt();
                Optional<User> user = userRepository.findById(userId);
                if (user.isPresent()) {
                    event.setUser(user.get());
                } else {
                    return ResponseEntity.badRequest().body("User not found");
                }
            }

            eventRepository.save(event);
            return ResponseEntity.ok(event);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        Optional<Event> event = eventRepository.findById(id);
        if (!event.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Integer id) {
        Optional<Event> event = eventRepository.findById(id);
        if (!event.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(event.get());
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(@RequestParam String name) {
        List<Event> events = eventService.searchEventsByName(name);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Event>> filterEvents(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        List<Event> events = eventService.filterEventsByDateRange(startDate, endDate);
        return ResponseEntity.ok(events);
    }
}