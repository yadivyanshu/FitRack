package com.tericcabrel.authapi.dao;

import lombok.Data;
import java.util.Date;

@Data
public class EventDTO {
    // private Integer id;
    private String name;
    private Date date;
    private Date startTime;
    private Date endTime;
    private Integer venueId;
    private Integer userId;
}
