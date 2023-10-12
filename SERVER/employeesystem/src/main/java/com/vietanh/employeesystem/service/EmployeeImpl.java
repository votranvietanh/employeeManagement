package com.vietanh.employeesystem.service;

import com.ducminh.employeesystem.model.*;
import com.ducminh.employeesystem.repository.*;
import com.vietanh.employeesystem.model.Employee;
import com.vietanh.employeesystem.model.Position;
import com.vietanh.employeesystem.model.Team;
import com.vietanh.employeesystem.model.Workdate;
import com.vietanh.employeesystem.repository.EmployeeRepository;
import com.vietanh.employeesystem.repository.PositionRepository;
import com.vietanh.employeesystem.repository.TeamRepository;
import com.vietanh.employeesystem.repository.WorkdateRepository;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeImpl implements EmployeeService {

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PositionRepository positionRepository;
    @Autowired
    private WorkdateRepository workdateRepository;


    @Override
    public Employee addEmployee(Employee employee, int positionID, int teamID) {
        Optional<Position> optionalPosition = positionRepository.findById(positionID);
        Optional<Team> optionalTeam = teamRepository.findById(teamID);
        if (optionalPosition.isPresent() && optionalTeam.isPresent()) {
            Position position = optionalPosition.get();
            Team team = optionalTeam.get();
            employee.setPosition(position);
            employee.setTeam(team);
            employeeRepository.save(employee);
            return employee;
        } else {
            throw new RuntimeException("Position or Team not found");
        }
    }

    private final String FOLDER_PATH = "D:\\Project\\MyFiles\\images\\";

//    @Override
//    public String addEmployeeWithImage(MultipartFile file) throws IOException {
//
//        //Tạo 1 path để lưu image
//        String filePath = FOLDER_PATH + file.getOriginalFilename();
//        Image image = imageRepository.save(Image.builder()
//                .imageName(file.getOriginalFilename())
//                .filePath(filePath).build());
//
//        //copy file đó vào file system
//        file.transferTo(new File(filePath));
//        if (image != null) {
//            return "Add successfully:" + filePath;
//        }
//        return null;
//    }


    @Override
    public String addEmployeeWithImage(Employee employee, int positionID, int teamID, MultipartFile file) throws IOException {
        Optional<Position> optionalPosition = positionRepository.findById(positionID);
        Optional<Team> optionalTeam = teamRepository.findById(teamID);

        if (optionalPosition.isPresent() && optionalTeam.isPresent()) {
            Position position = optionalPosition.get();
            Team team = optionalTeam.get();
            employee.setPosition(position);
            employee.setTeam(team);

            if (file != null && !file.isEmpty()) {
                try {
                    String filePath = FOLDER_PATH + file.getOriginalFilename();
                    file.transferTo(new File(filePath));
                    employee.setImagePath(filePath);
                    employee.setImageName(file.getOriginalFilename());
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new RuntimeException("Failed to upload image");
                }
            }

            employeeRepository.save(employee);

            return "success";
        } else {
            throw new RuntimeException("Position or Team not found");
        }
    }

    @Override
    public byte[] downloadImageFromFileSystem(String fileName, int employeeID) throws IOException {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();

//            Optional<Employee> dbImageData = employeeRepository.findByImageName(fileName);
            String filePath = employee.getImagePath(); //lấy đường dẫn hình ảnh
            byte[] images = Files.readAllBytes(new File(filePath).toPath()); //convert sang byte array
            return images;
        }
        throw new RuntimeException("No such employee");
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public String deleteEmployee(int employeeID) {
        employeeRepository.deleteById(employeeID);
        return "Employee removed";
    }

    @Override
    public Optional<Employee> getEmployeeById(int employeeID) {
        return employeeRepository.findById(employeeID);
    }

    @Override
    public Employee updateEmployee(Employee employee, int positionID, int teamID) {
        Optional<Position> optionalPosition = positionRepository.findById(positionID);
        Optional<Team> optionalTeam = teamRepository.findById(teamID);
        if (optionalPosition.isPresent() && optionalTeam.isPresent()) {
            Position position = optionalPosition.get();
            Team team = optionalTeam.get();

            Employee existingEmployee = employeeRepository.findById(employee.getEmployeeID()).orElse(null);
            existingEmployee.setAddress(employee.getAddress());
            existingEmployee.setAge(employee.getAge());
            existingEmployee.setSex(employee.isSex());
            existingEmployee.setFullName(employee.getFullName());
            existingEmployee.setMoneyPerHour(employee.getMoneyPerHour());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setPicture(employee.getPicture());
            existingEmployee.setStartDate(employee.getStartDate());
            existingEmployee.setTeam(team);
            existingEmployee.setPosition(position);

//            Update hình ảnh
//            String filePath = FOLDER_PATH + file.getOriginalFilename();
//            file.transferTo(new File(filePath));
//            existingEmployee.setImagePath(filePath);
//            existingEmployee.setImageName(file.getOriginalFilename());

            return employeeRepository.save(existingEmployee);
        } else {
            throw new RuntimeException("Position or Team not found");
        }
    }

    @Override
    public String updateEmployeeImage(int employeeID, MultipartFile file) throws IOException {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if(optionalEmployee.isPresent() && file!=null){
            Employee employee = optionalEmployee.get();

            String filePath = FOLDER_PATH + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            employee.setImagePath(filePath);
            employee.setImageName(file.getOriginalFilename());
            employeeRepository.save(employee);
            return "Image changed successful";
        } else {
            throw new RuntimeException("No such employee in database");
        }
    }

    @Override
    public Employee deleteWorkdateFromEmployee(int employeeID, int workdateID) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        Optional<Workdate> optionalWorkdate = workdateRepository.findById(workdateID);
        //Kiểm tra null vơ 2 object với id được truyền vào
        if (optionalEmployee.isPresent() && optionalWorkdate.isPresent()) {
            //Lấy đối tượng employee
            Employee employee = optionalEmployee.get();
            List<Workdate> workdates = employee.getWorkdate();
            workdates.remove(optionalWorkdate.get());
            employee.setWorkdate(workdates);
            employeeRepository.save(employee);
            return employee;
        } else {
            throw new RuntimeException("Employee or Workdate not found.");
        }
    }

    @Override
    public List<Employee> deleteEmployeeList(List employeeIdList) {
        System.out.println("The list was followed:" + employeeIdList);
        employeeRepository.deleteAllById(employeeIdList);
        return employeeRepository.findAll();
    }

    @Override
    public String removeFromTeam(int employeeID) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeID);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            employee.setTeam(teamRepository.findByTeamName("None").get());
            employeeRepository.save(employee);
            return ("Employee Successfully removed from team:" + employee);
        } else throw new EntityExistsException("No such employee in database");
    }
}