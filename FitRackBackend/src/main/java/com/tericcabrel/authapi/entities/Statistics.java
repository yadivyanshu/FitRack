package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "statistics")
@Data
public class Statistics {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private int gamesPlayed;

    @Column(nullable = false)
    private int pointsScored;

    @Column(nullable = false)
    private int assists;

    @Column(nullable = false)
    private int rebounds;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;
}