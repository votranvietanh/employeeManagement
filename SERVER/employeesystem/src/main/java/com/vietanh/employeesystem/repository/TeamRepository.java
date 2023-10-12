package com.vietanh.employeesystem.repository;

import com.vietanh.employeesystem.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    Optional<Team> findByTeamName(String teamName);
}
