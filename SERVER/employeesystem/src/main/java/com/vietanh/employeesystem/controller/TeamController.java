package com.vietanh.employeesystem.controller;

import com.vietanh.employeesystem.model.Team;
import com.vietanh.employeesystem.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping("/add")
 
    public Team add(@RequestBody Team team) {
        return teamService.saveTeam(team);
    }

    @GetMapping("/getAll")
 
    public List<Team> getAllTeams() {
        return teamService.getAllTeam();
    }

    @GetMapping("/{teamID}")
 
    public Optional getTeamById(@PathVariable int teamID) {
        return teamService.getTeamById(teamID);
    }

    @DeleteMapping("/{teamID}")
 
    public String deleteTeam(@PathVariable int teamID) {
        return teamService.deleteTeam(teamID);
    }

    @DeleteMapping("/{teamID}/employee/{employeeID}")
 
    public Team deleteEmployee(
            @PathVariable int teamID,
            @PathVariable int employeeID
    ) {
        return teamService.deleteEmployeeFromTeam(teamID, employeeID);
    }

    @PutMapping("/{teamID}/employee/{employeeID}")
 
    public Team addEmployee(
            @PathVariable int teamID,
            @PathVariable int employeeID
    ) {
        return teamService.updateTeamForEmployee(teamID, employeeID);
    }

    @PutMapping("/update")
 
    public Team updateTeam(@RequestBody Team team) {
        return teamService.updateTeam(team);
    }
}
