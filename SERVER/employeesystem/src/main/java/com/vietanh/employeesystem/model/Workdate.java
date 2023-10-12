package com.vietanh.employeesystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Workdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workdateID;
    private String dateOfWork;
    private int hour;
    private int employeeID;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employeeID")
    @JsonIgnore
    private Employee employee;

    public Workdate() {
    }

    public int getEmployeeID() {
        return employee.getEmployeeID();
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getWorkdateID() {
        return workdateID;
    }

    public void setWorkdateID(int workdateID) {
        this.workdateID = workdateID;
    }

    public String getDateOfWork() {
        return dateOfWork;
    }

    public void setDateOfWork(String dateOfWork) {
        this.dateOfWork = dateOfWork;
    }
}
