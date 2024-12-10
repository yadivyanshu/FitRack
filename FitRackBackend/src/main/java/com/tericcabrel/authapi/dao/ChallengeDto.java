package com.tericcabrel.authapi.dao;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class ChallengeDto {
    private Integer id;
    private String name;
    private String description;
    private Date startDate;
    private Date endDate;
    private Set<UserDto> participants;
}
