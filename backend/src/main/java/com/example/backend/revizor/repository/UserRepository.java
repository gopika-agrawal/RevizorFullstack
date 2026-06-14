package com.example.backend.revizor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.revizor.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Users findByEmail(String email);

}
