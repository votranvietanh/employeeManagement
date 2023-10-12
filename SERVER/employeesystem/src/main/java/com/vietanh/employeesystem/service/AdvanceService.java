package com.vietanh.employeesystem.service;

import com.vietanh.employeesystem.model.Advance;

import java.util.List;
import java.util.Optional;

public interface AdvanceService {
    public Advance addAdvance(Advance advance, int employeeID);
    public List<Advance> getAllAdvance();
    public  String deleteAdvance(int advanceID);
    public Optional<Advance> getAdvanceById(int advanceID);
    public Advance updateAdvance(Advance advance);
}
