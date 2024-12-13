package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "events")
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull(message = "Event name is required")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Event date is required")
    @Column(nullable = false)
    private Date date;

    @NotNull(message = "Event start time is required")
    @Column(nullable = false)
    private Date startTime;

    @NotNull(message = "Event end time is required")
    @Column(nullable = false)
    private Date endTime;

    @ManyToOne
    @JoinColumn(name = "venue_id", referencedColumnName = "id")
    private Venue venue;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // getters and setters
}
