package com.vietanh.employeesystem.service;

import com.ducminh.employeesystem.model.*;
import com.vietanh.employeesystem.model.Employee;
import com.vietanh.employeesystem.model.Team;
import com.vietanh.employeesystem.repository.EmployeeRepository;
import com.vietanh.employeesystem.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamImpl implements TeamService {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Team saveTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public List<Team> getAllTeam() {
        return teamRepository.findAll();
    }

    @Override
    public String deleteTeam(int teamID) {
        teamRepository.deleteById(teamID);
        return "Team removed";
    }

    @Override
    public Optional<Team> getTeamById(int teamID) {
        return teamRepository.findById(teamID);
    }

    @Override
    public Team updateTeam(Team team) {
        Team existingTeam = teamRepository.findById(team.getTeamID()).orElse(null);
        existingTeam.setTeamName(team.getTeamName());
        return teamRepository.save(existingTeam);
    }

    @Override
    public Team deleteEmployeeFromTeam(int teamID, int employeeID) {
        Optional<Team> optionalTeam = teamRepository.findById(teamID);
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if (optionalTeam.isPresent() && optionalEmployee.isPresent()) {
            Team team = optionalTeam.get();
            //Xóa employee khỏi dnah sách chỉ cần set team là null
            Employee employeeToRemove = optionalEmployee.get();
            employeeToRemove.setTeam(null);
            teamRepository.save(team);
            return team;
        } else {
            throw new RuntimeException("Employee or Position not found");
        }
    }

    @Override
    public Team updateTeamForEmployee(int teamID, int employeeID) {
        Optional<Team> optionalTeam = teamRepository.findById(teamID);
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if (optionalTeam.isPresent() && optionalEmployee.isPresent()) {
            Team team = optionalTeam.get();
            Employee employee = optionalEmployee.get();
            employee.setTeam(team);
            teamRepository.save(team);
            return team;
        } else {
            throw new RuntimeException("Employee or Position not found");
        }
    }
}

