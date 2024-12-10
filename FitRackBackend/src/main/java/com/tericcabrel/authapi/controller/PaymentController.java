package com.tericcabrel.authapi.controller;

import com.tericcabrel.authapi.entities.Payment;
import com.tericcabrel.authapi.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/process/{eventId}")
    public ResponseEntity<Payment> processPayment(@PathVariable Integer eventId, @RequestBody PaymentRequest paymentRequest) {
        try {
            Payment payment = paymentService.processPayment(eventId, paymentRequest.getPaymentDetails());
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

    public static class PaymentRequest {
        private String paymentDetails;

        public String getPaymentDetails() {
            return paymentDetails;
        }

        public void setPaymentDetails(String paymentDetails) {
            this.paymentDetails = paymentDetails;
        }
    }
}
