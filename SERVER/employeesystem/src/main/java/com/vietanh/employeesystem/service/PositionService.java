package com.vietanh.employeesystem.service;

import com.vietanh.employeesystem.model.Position;

import java.util.List;
import java.util.Optional;

public interface PositionService {
    public Position addPosition(Position position);

    public List<Position> getAllPosition();

    public String deletePosition(int positionID);

    public Optional<Position> getPositionById(int positionID);

    public Position updatePosition(Position position);

    public Position updatePositionForEmployee(int positionID, int employeeID);

    public Position deleteEmployeeFromPosition(int positionID, int employeeID);
}

