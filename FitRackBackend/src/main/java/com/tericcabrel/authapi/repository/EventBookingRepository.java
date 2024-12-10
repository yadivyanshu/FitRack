package com.tericcabrel.authapi.repository;

import com.tericcabrel.authapi.entities.EventBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventBookingRepository extends JpaRepository<EventBooking, Integer> {
}
