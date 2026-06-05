package com.example.backend.revizor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.revizor.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    void deleteByUserId(Long userId);

}
