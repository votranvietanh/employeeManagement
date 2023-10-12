package com.vietanh.employeesystem.controller;

import com.vietanh.employeesystem.model.Position;
import com.vietanh.employeesystem.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/position")
public class PositionController {
    @Autowired
    private PositionService positionService;

    @PostMapping("/add")
 
    public Position add(@RequestBody Position position) {
        return positionService.addPosition(position);
    }

    @PutMapping("/{positionID}/employee/{employeeID}")
 
    public Position updatePositionForEmployee(
            @PathVariable int positionID,
            @PathVariable int employeeID
    ) {
        return positionService.updatePositionForEmployee(positionID, employeeID);
    }

    @GetMapping("/getAll")
 
    public List<Position> getAllPosition() {
        return positionService.getAllPosition();
    }

    @GetMapping("/{positionID}")
 
    public Optional getPositionById(@PathVariable int positionID) {
        return positionService.getPositionById(positionID);
    }

    @DeleteMapping("/{positionID}")
 
    public String deletePosition(@PathVariable int positionID) {
        return positionService.deletePosition(positionID);
    }

    @DeleteMapping("/{positionID}/employee/{employeeID}")
 
    public Position deleteEmployee(
            @PathVariable int positionID,
            @PathVariable int employeeID
    ) {
        return positionService.deleteEmployeeFromPosition(positionID, employeeID);
    }

    @PutMapping("/update/{positionID}")
 
    public Position updatePosition(@PathVariable int positionID, @RequestBody Position position) {
        return positionService.updatePosition(position);
    }
}
