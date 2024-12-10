package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "user_progress")
@Data
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String activity;

    @Column(nullable = false)
    private int duration; 

    @Column(nullable = false)
    private Date date;
}
