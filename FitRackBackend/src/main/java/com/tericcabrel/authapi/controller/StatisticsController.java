package com.tericcabrel.authapi.controller;

import com.tericcabrel.authapi.entities.Statistics;
import com.tericcabrel.authapi.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Statistics>> getStatisticsByUserId(@PathVariable Integer userId) {
        try {
            List<Statistics> statistics = statisticsService.getStatisticsByUserId(userId);
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Statistics> createStatistics(@RequestBody Statistics statistics) {
        try {
            Statistics createdStatistics = statisticsService.createStatistics(statistics);
            return ResponseEntity.ok(createdStatistics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Statistics> updateStatistics(@PathVariable Integer id, @RequestBody Statistics statisticsDetails) {
        try {
            Statistics updatedStatistics = statisticsService.updateStatistics(id, statisticsDetails);
            return ResponseEntity.ok(updatedStatistics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStatistics(@PathVariable Integer id) {
        try {
            statisticsService.deleteStatistics(id);
            return ResponseEntity.ok("Statistics deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting statistics");
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
