package com.tericcabrel.authapi.controller;

import com.tericcabrel.authapi.entities.EventBooking;
import com.tericcabrel.authapi.service.EventBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class EventBookingController {

    @Autowired
    private EventBookingService eventBookingService;

    @PostMapping("/events/{eventId}")
    public ResponseEntity<EventBooking> bookEvent(@PathVariable Integer eventId) {
        try {
            EventBooking eventBooking = eventBookingService.bookEvent(eventId);
            return ResponseEntity.ok(eventBooking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<EventBooking>> getAllBookings() {
        try {
            List<EventBooking> bookings = eventBookingService.getAllBookings();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<EventBooking> getBookingById(@PathVariable Integer bookingId) {
        try {
            EventBooking booking = eventBookingService.getBookingById(bookingId);
            if (booking != null) {
                return ResponseEntity.ok(booking);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
