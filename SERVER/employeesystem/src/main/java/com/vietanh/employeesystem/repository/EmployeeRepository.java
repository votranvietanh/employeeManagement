package com.vietanh.employeesystem.repository;

import com.vietanh.employeesystem.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//Luồng Spring từ View đến Database:
//Repository nhận yêu cầu từ Service
//Sẽ thao tác với DB và lấy ra Data từ Database
//Data lấy ra sẽ được ORM mapping thành các object(entity) trong java
//---------------------------------------------------
//Luồng Spring từ Database về View:
//Repository trả các Entity từ database về Service khi được gọi
//---------------------------------------
@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

    Optional<Employee> findByImageName(String fileName);
}
