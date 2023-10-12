package com.vietanh.employeesystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeID;

    private String fullName;
    private int age;
    private boolean sex;
    private String address;
    private String phone;
    private int moneyPerHour;
    private String startDate;
    @Transient
    private MultipartFile file;
    private String imagePath;
    private String imageName;
    private String teamName;
    private String positionName;
    private String picture;

    private MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "image_id", referencedColumnName = "imageID")
//    private Image image;
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Workdate> workdate;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Advance> advance;

    @ManyToOne
    @JoinColumn(name = "position_id", referencedColumnName = "positionID")
    @JsonIgnore
    private Position position;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "teamID")
    @JsonIgnore
    private Team team;
    private int teamID;
    private int positionID;


    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public int getTeamID() {
        return team.getTeamID();
    }

    public int getPositionID() {
        return position.getPositionID();
    }

    public String getTeamName() {
        return team != null ? team.getTeamName() : null;
    }

    public String getPositionName() {
        return position != null ? position.getPositionName() : null;
    }


//    public Image getImage() {
//        return image;
//    }
//
//    public void setImage(Image image) {
//        this.image = image;
//    }


    public Employee() {
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public List<Advance> getAdvance() {
        return advance;
    }

    public void setAdvance(List<Advance> advance) {
        this.advance = advance;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public List<Workdate> getWorkdate() {
        return workdate;
    }

    public void setWorkdate(List<Workdate> workdate) {
        this.workdate = workdate;
    }

    public int getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(int employeeID) {
        this.employeeID = employeeID;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isSex() {
        return sex;
    }

    public void setSex(boolean sex) {
        this.sex = sex;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getMoneyPerHour() {
        return moneyPerHour;
    }

    public void setMoneyPerHour(int moneyPerHour) {
        this.moneyPerHour = moneyPerHour;
    }

}
