package com.tericcabrel.authapi.mapper;

import com.tericcabrel.authapi.dao.TeamDTO;
import com.tericcabrel.authapi.entities.Team;
import com.tericcabrel.authapi.entities.User;

import java.util.stream.Collectors;

public class TeamMapper {
    public static TeamDTO toDTO(Team team) {
        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setEventId(team.getEvent().getId());
        dto.setCreatedById(team.getCreatedBy().getId());
        dto.setMemberIds(team.getMembers().stream().map(User::getId).collect(Collectors.toSet()));
        return dto;
    }

    public static Team toEntity(TeamDTO dto) {
        Team team = new Team();
        team.setId(dto.getId());
        team.setName(dto.getName());
        // Set event and createdBy using their respective repositories
        return team;
    }
}
