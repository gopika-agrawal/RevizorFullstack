package com.example.backend.revizor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.revizor.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Transactional
    @Modifying
    void deleteByUserId(Long userId);

    List<Question> findByUserId(Long userId);

}
