package com.vietanh.employeesystem.repository;

import com.vietanh.employeesystem.model.Workdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkdateRepository extends JpaRepository<Workdate, Integer> {
}
