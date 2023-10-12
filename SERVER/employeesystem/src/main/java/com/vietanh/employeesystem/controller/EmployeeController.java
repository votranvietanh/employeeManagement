package com.vietanh.employeesystem.controller;

import com.vietanh.employeesystem.model.Employee;
import com.vietanh.employeesystem.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

//Controller là nơi tiếp nhận request từ View đầu tiên
//Luồng Spring từ View đến Database:
//Controller nhận yêu cầu từ View sẽ hỏi Service (method)
//--------------------------------------
//Luồng Spring từ Database về View:
//Controller nhận được Model sẽ return cho View thông qua APIs hoặc "cục" HTML (đã được gắn data)
//---------------------------------------
@RestController
@CrossOrigin
@RequestMapping("/employee") // Endpoint gốc là /employee

public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public Employee add(
            @RequestBody Employee employee,
            @RequestParam int positionID,
            @RequestParam int teamID) {
        return employeeService.addEmployee(employee, positionID, teamID);
    }

    @PostMapping("/addwithimage")
    public ResponseEntity<?> addWithImage(
            @ModelAttribute Employee employee,
            @RequestParam int positionID,
            @RequestParam int teamID,
            @RequestPart("file") MultipartFile file) throws IOException {
        String savedEmployee = employeeService.addEmployeeWithImage(employee, positionID, teamID, file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(savedEmployee);
    }

    @GetMapping("{employeeID}/image/{fileName}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName, @PathVariable int employeeID) throws IOException {
        byte[] imageData = employeeService.downloadImageFromFileSystem(fileName, employeeID);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }

    @GetMapping("/getAll")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Employee> getAllEmployee() {
        return employeeService.getAllEmployee();
    }

    @GetMapping("/{employeeID}")
    public Optional getTeamById(@PathVariable int employeeID) {
        return employeeService.getEmployeeById(employeeID);
    }

    @DeleteMapping("/deleteList")
    public List<Employee> deleteEmployeeList(@RequestBody List<Integer> idList) {
        System.out.println(idList);
        return employeeService.deleteEmployeeList(idList);
    }

    @DeleteMapping("/{employeeID}")
    public String deleteEmployee(@PathVariable int employeeID) {
        return employeeService.deleteEmployee(employeeID);
    }

//    @PutMapping("/update")
//    public Employee updateEmployee(@ModelAttribute Employee employee, int positionID, int teamID, @RequestPart("file") MultipartFile file) throws IOException {
//        return employeeService.updateEmployee(employee, positionID, teamID, file);
//    }
    @PutMapping("/update")
    public Employee updateEmployee(@ModelAttribute Employee employee, int positionID, int teamID){
        return employeeService.updateEmployee(employee, positionID, teamID);
    }
    @PutMapping("/removefromteam/{employeeID}")
    public String removeFromTeam(@PathVariable int employeeID) {
        return employeeService.removeFromTeam(employeeID);
    }
    @PutMapping("/updateimage/{employeeID}")
    public String updateEmployeeImage(@PathVariable int employeeID,@RequestPart("file") MultipartFile file) throws IOException {
        return employeeService.updateEmployeeImage(employeeID,file);
    }
}
