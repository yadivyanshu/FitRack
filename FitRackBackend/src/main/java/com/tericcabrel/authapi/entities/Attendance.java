package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "attendances")
@Data
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull(message = "User is required")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Event is required")
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @NotNull(message = "Date is required")
    @Column(nullable = false)
    private Date date;
}