package com.vietanh.employeesystem.service;

import com.vietanh.employeesystem.model.Employee;
import com.vietanh.employeesystem.model.Position;
import com.vietanh.employeesystem.repository.EmployeeRepository;
import com.vietanh.employeesystem.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PositionImpl implements PositionService {
    @Autowired
    private PositionRepository positionRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Position addPosition(Position position) {
        return positionRepository.save(position);
    }

    @Override
    public List<Position> getAllPosition() {
        return positionRepository.findAll();
    }

    @Override
    public String deletePosition(int positionID) {
        positionRepository.deleteById(positionID);
        return "Position removed";
    }

    @Override
    public Optional<Position> getPositionById(int positionID) {

        return positionRepository.findById(positionID);
    }

    @Override
    public Position updatePosition(Position position) {
        Position existingPosition = positionRepository.findById(position.getPositionID()).orElse(null);
        existingPosition.setPositionName(position.getPositionName());
        return positionRepository.save(existingPosition);
    }

    @Override
    public Position updatePositionForEmployee(int positionID, int employeeID) {
        Optional<Position> optionalPosition = positionRepository.findById(positionID);
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if (optionalPosition.isPresent() && optionalEmployee.isPresent()) {
            Position position = optionalPosition.get();
            Employee employee = optionalEmployee.get();
            employee.setPosition(position);
            positionRepository.save(position);
            return position;
        } else {
            throw new RuntimeException("Employee or Position not found");
        }
    }

    @Override
    public Position deleteEmployeeFromPosition(int positionID, int employeeID) {
        Optional<Position> optionalPosition = positionRepository.findById(positionID);
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if (optionalPosition.isPresent() && optionalEmployee.isPresent()) {
            Position position = optionalPosition.get();
            //Xóa employee khỏi dnah sách chỉ cần set position là null
            Employee employeeToRemove = optionalEmployee.get();
            employeeToRemove.setPosition(null);
            positionRepository.save(position);
            return position;
        } else {
            throw new RuntimeException("Employee or Position not found");
        }
    }
}