package com.vietanh.employeesystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Advance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int advanceID;
    private String dateGetAdvance;
    private int money;
    private int employeeID;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employeeID")
    @JsonIgnore
    private Employee employee;

    public Advance() {
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

    public int getAdvanceID() {
        return advanceID;
    }

    public void setAdvanceID(int advanceID) {
        this.advanceID = advanceID;
    }

    public String getDateGetAdvance() {
        return dateGetAdvance;
    }

    public void setDateGetAdvance(String dateGetAdvance) {
        this.dateGetAdvance = dateGetAdvance;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }
}
