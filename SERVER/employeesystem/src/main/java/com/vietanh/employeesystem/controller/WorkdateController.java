package com.vietanh.employeesystem.controller;

import com.vietanh.employeesystem.model.Workdate;
import com.vietanh.employeesystem.service.WorkdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/workdate")
public class WorkdateController {
    @Autowired
    private WorkdateService workdateService;

    @PostMapping("/add")
 
    public Workdate add(@RequestBody Workdate workdate, int employeeID) {
        return workdateService.addWorkdate(workdate,employeeID);
    }

    @GetMapping("/getAll")
 
    public List<Workdate> getAllWorkdates() {
        return workdateService.getAllWorkdate();
    }

    @GetMapping("/{workdateID}")
 
    public Optional getWorkdateById(@PathVariable int workdateID) {
        return workdateService.getWorkdateById(workdateID);
    }

    @DeleteMapping("/{workdateID}")
 
    public String deleteWorkdate(@PathVariable int workdateID) {
        return workdateService.deleteWorkdate(workdateID);
    }

    @PutMapping("/update")
 
    public Workdate updateWorkdate(@RequestBody Workdate workdate) {
        return workdateService.updateWorkdate(workdate);
    }
}
