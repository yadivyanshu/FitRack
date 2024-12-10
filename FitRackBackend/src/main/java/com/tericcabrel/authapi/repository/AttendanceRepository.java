package com.tericcabrel.authapi.repository;

import com.tericcabrel.authapi.entities.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    List<Attendance> findByUserId(Integer userId);
}