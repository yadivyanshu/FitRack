package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.entities.Event;
import com.tericcabrel.authapi.entities.Payment;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repository.EventRepository;
import com.tericcabrel.authapi.repository.PaymentRepository;
import com.tericcabrel.authapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public Payment processPayment(Integer eventId, String paymentDetails) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findByEmail(userEmail);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

        Payment payment = new Payment();
        payment.setPaymentDetails(paymentDetails); // Store the plain string
        payment.setStatus("SUCCESS"); // Static status for simplicity
        payment.setUser(user);
        payment.setEvent(event);

        return paymentRepository.save(payment);
    }
}
