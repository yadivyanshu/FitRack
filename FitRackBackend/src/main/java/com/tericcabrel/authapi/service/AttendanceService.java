package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.entities.Attendance;
import com.tericcabrel.authapi.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;

    public List<Attendance> getAttendanceByUserId(Integer userId) {
        return attendanceRepository.findByUserId(userId);
    }

    public Attendance createAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }
}