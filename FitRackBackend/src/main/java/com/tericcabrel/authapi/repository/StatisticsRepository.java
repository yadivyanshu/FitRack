package com.tericcabrel.authapi.repository;

import com.tericcabrel.authapi.entities.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, Integer> {
    List<Statistics> findByUserId(Integer userId);
}