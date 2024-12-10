package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.entities.Event;
import com.tericcabrel.authapi.entities.EventBooking;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repository.EventBookingRepository;
import com.tericcabrel.authapi.repository.EventRepository;
import com.tericcabrel.authapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventBookingService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventBookingRepository eventBookingRepository;

    public EventBooking bookEvent(Integer eventId) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findByEmail(userEmail);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

        EventBooking eventBooking = new EventBooking();
        eventBooking.setEvent(event);
        eventBooking.setUser(user);
        eventBooking.setStatus("BOOKED");

        return eventBookingRepository.save(eventBooking);
    }

    public List<EventBooking> getAllBookings() {
        return eventBookingRepository.findAll();
    }

    public EventBooking getBookingById(Integer bookingId) {
        return eventBookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
    }
}
