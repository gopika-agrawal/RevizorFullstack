package com.example.backend.revizor.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.dto.QuestionYearDto;
import com.example.backend.revizor.entity.Question;
import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.repository.QuestionRepository;
import com.example.backend.revizor.repository.UserRepository;
import com.example.backend.revizor.service.UnitAnanlysisService;

import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/unit")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UnitAnalysisController {

    private final UserRepository userRepository;

    private final QuestionRepository questionRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    private final UnitAnanlysisService unitAnanlysisService;
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUnitAnalysis(@PathVariable Long id) throws Exception {
        System.out.println("UserId = " + id);

        Users user = userRepository.findById(id).orElseThrow();

        String university = user.getUniversity();

        List<Question> questions = questionRepository.findAll();

        List<QuestionYearDto> input = questions.stream().map(q -> 
                                     new QuestionYearDto(
                                        q.getQuestionText(),
                                        q.getYear()
                                     ))
                                     .toList();

        String questionJson = objectMapper.writeValueAsString(input);

        String response = unitAnanlysisService.analysisUnits(university, questionJson);

        String cleaned = response
                        .replace("```json", "")
                        .replace("```", "")
                        .trim();

        
        return ResponseEntity.ok(cleaned);
        
    }

}
