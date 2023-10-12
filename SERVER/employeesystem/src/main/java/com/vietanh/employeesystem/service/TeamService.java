package com.vietanh.employeesystem.service;

import com.vietanh.employeesystem.model.Team;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    public Team saveTeam(Team team);

    public List<Team> getAllTeam();

    public String deleteTeam(int teamID);

    public Optional<Team> getTeamById(int teamID);

    public Team updateTeam(Team team);

    public Team deleteEmployeeFromTeam(int teamID, int employeeID);

    public Team updateTeamForEmployee(int teamID, int employeeID);
}
