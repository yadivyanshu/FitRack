package com.tericcabrel.authapi.service;

import com.tericcabrel.authapi.entities.Statistics;
import com.tericcabrel.authapi.repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService {
    @Autowired
    private StatisticsRepository statisticsRepository;

    public List<Statistics> getStatisticsByUserId(Integer userId) {
        return statisticsRepository.findByUserId(userId);
    }

    public Statistics createStatistics(Statistics statistics) {
        return statisticsRepository.save(statistics);
    }

    public Statistics updateStatistics(Integer id, Statistics statisticsDetails) {
        Statistics statistics = statisticsRepository.findById(id).orElseThrow(() -> new RuntimeException("Statistics not found"));
        statistics.setGamesPlayed(statisticsDetails.getGamesPlayed());
        statistics.setPointsScored(statisticsDetails.getPointsScored());
        statistics.setAssists(statisticsDetails.getAssists());
        statistics.setRebounds(statisticsDetails.getRebounds());
        return statisticsRepository.save(statistics);
    }

    public void deleteStatistics(Integer id) {
        statisticsRepository.deleteById(id);
    }
}