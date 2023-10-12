package com.vietanh.employeesystem.controller;

import com.vietanh.employeesystem.model.Advance;
import com.vietanh.employeesystem.service.AdvanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/advance")
public class AdvanceController {
    @Autowired
    private AdvanceService advanceService;

    @PostMapping("/add")
 
    public Advance add(@RequestBody Advance advance, int employeeID) {
        return advanceService.addAdvance(advance,employeeID);
    }

    @GetMapping("/getAll")
 
    public List<Advance> getAllAdvances() {
        return advanceService.getAllAdvance();
    }

    @GetMapping("/{advanceID}")
 
    public Optional getAdvanceById(@PathVariable int advanceID) {
        return advanceService.getAdvanceById(advanceID);
    }

    @DeleteMapping("/{advanceID}")
 
    public String deleteAdvance(@PathVariable int advanceID) {
        return advanceService.deleteAdvance(advanceID);
    }

    @PutMapping("/update")
 
    public Advance updateAdvance(@RequestBody Advance advance) {
        return advanceService.updateAdvance(advance);
    }
}
