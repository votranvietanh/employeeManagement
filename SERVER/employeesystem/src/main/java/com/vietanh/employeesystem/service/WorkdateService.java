package com.vietanh.employeesystem.service;

import com.vietanh.employeesystem.model.Workdate;

import java.util.List;
import java.util.Optional;

public interface WorkdateService {
    public Workdate addWorkdate(Workdate workdate, int employeeID);
    public List<Workdate> getAllWorkdate();
    public  String deleteWorkdate(int workdateID);
    public Optional<Workdate> getWorkdateById(int workdateID);
    public Workdate updateWorkdate(Workdate workdate);
}
