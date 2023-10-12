package com.vietanh.employeesystem.repository;

import com.vietanh.employeesystem.model.Advance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvanceRepository extends JpaRepository<Advance, Integer> {
}
