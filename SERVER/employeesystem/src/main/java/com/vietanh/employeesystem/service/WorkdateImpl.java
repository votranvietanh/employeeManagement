package com.vietanh.employeesystem.service;

import com.ducminh.employeesystem.model.*;
import com.vietanh.employeesystem.model.Employee;
import com.vietanh.employeesystem.model.Workdate;
import com.vietanh.employeesystem.repository.EmployeeRepository;
import com.vietanh.employeesystem.repository.WorkdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkdateImpl implements WorkdateService {
    @Autowired
    private WorkdateRepository workdateRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Workdate addWorkdate(Workdate workdate, int employeeID) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            workdate.setEmployee(employee);
            workdateRepository.save(workdate);
            return workdate;
        } else {
            throw new RuntimeException("EmployeeID  not found");
        }
    }

    @Override
    public List<Workdate> getAllWorkdate() {
        return workdateRepository.findAll();
    }

    @Override
    public String deleteWorkdate(int workdateID) {
        workdateRepository.deleteById(workdateID);
        return "Employee removed";
    }

    @Override
    public Optional<Workdate> getWorkdateById(int workdateID) {

        return workdateRepository.findById(workdateID);
    }

    @Override
    public Workdate updateWorkdate(Workdate workdate) {
        Workdate existingWorkdate = workdateRepository.findById(workdate.getWorkdateID()).orElse(null);
        existingWorkdate.setDateOfWork(workdate.getDateOfWork());
        return workdateRepository.save(existingWorkdate);
    }
}
