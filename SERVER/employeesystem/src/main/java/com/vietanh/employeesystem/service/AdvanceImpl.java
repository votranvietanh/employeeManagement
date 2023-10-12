package com.vietanh.employeesystem.service;

import com.ducminh.employeesystem.model.*;
import com.vietanh.employeesystem.model.Advance;
import com.vietanh.employeesystem.model.Employee;
import com.vietanh.employeesystem.repository.EmployeeRepository;
import com.vietanh.employeesystem.repository.AdvanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdvanceImpl implements AdvanceService {
    @Autowired
    private AdvanceRepository advanceRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Advance addAdvance(Advance advance, int employeeID) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            advance.setEmployee(employee);
            advanceRepository.save(advance);
            return advance;
        } else {
            throw new RuntimeException("EmployeeID  not found");
        }
    }

    @Override
    public List<Advance> getAllAdvance() {
        return advanceRepository.findAll();
    }

    @Override
    public String deleteAdvance(int advanceID) {
        advanceRepository.deleteById(advanceID);
        return "Employee removed";
    }

    @Override
    public Optional<Advance> getAdvanceById(int advanceID) {

        return advanceRepository.findById(advanceID);
    }

    @Override
    public Advance updateAdvance(Advance advance) {
        Advance existingAdvance = advanceRepository.findById(advance.getAdvanceID()).orElse(null);
        existingAdvance.setDateGetAdvance(advance.getDateGetAdvance());
        return advanceRepository.save(existingAdvance);
    }
}
