package com.tericcabrel.authapi.dao;

import java.util.Set;

import lombok.Data;
@Data
public class TeamDTO {
    private Integer id;
    private String name;
    private Integer eventId;
    private Integer createdById;
    private Set<Integer> memberIds;

    
}
