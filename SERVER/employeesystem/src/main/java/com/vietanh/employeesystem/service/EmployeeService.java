package com.vietanh.employeesystem.service;

import com.vietanh.employeesystem.model.Employee;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

//Luồng Spring từ View đến Database:
//Service nhận yêu cầu từ Controller
//Khi service có thao tác váo Database thì sẽ gọi Repository để lấy dữ liệu trong Database
//-------------------------------------------
//Luồng Spring từ Database về View:
//Service nhận lại data đã request tới Repository và thực hiện các business logic
//Các Entity sau khi được xử lý sẽ biến thành Model và trả về Controller yêu cầu/
//---------------------------------------
public interface EmployeeService {
    public String addEmployeeWithImage(Employee employee, int positionID, int teamID,MultipartFile file) throws IOException;
    public byte[] downloadImageFromFileSystem(String fileName,int employeeID) throws IOException;

    public Employee addEmployee(Employee employee, int positionID, int teamID);
    public List<Employee> getAllEmployee();

    public String deleteEmployee(int employeeID);

    public Optional<Employee> getEmployeeById(int employeeID);

    public Employee updateEmployee(Employee employee,int positionID, int teamID);
    public String updateEmployeeImage(int employeeID, MultipartFile file) throws IOException;

    public Employee deleteWorkdateFromEmployee(int employeeID, int workdateID);

    public List<Employee> deleteEmployeeList(List employeeIdList);

    public String removeFromTeam(int employeeID);
//    public Employee addEmployeeWithImage(Employee employee, int positionID, int teamID, MultipartFile file);
}
