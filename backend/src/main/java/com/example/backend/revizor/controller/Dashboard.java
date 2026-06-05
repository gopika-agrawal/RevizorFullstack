package com.example.backend.revizor.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.dto.DashboardDto;
import com.example.backend.revizor.dto.QuestionYearDto;
import com.example.backend.revizor.entity.Question;
import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.repository.QuestionRepository;
import com.example.backend.revizor.repository.UserRepository;
import com.example.backend.revizor.service.AnalysisService;
import com.example.backend.revizor.service.UnitAnanlysisService;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class Dashboard {

    private final UnitAnanlysisService unitAnanlysisService;

    private final AnalysisService analysisService;

    private final QuestionRepository questionRepository;

    private final UserRepository userRepository;

    private final ObjectMapper objectMapper;


    @GetMapping("/{userId}")
    public ResponseEntity<?> generateInsights(@PathVariable Long userId) throws Exception {

        Users user = userRepository.findById(userId).orElseThrow();

        String university = user.getUniversity();

        List<Question> questions = questionRepository.findAll();

        List<QuestionYearDto> input = questions.stream().map(q -> 
            new QuestionYearDto(q.getQuestionText(),q.getYear())
        ).toList();


        String questionJson = objectMapper.writeValueAsString(input);


        String unitAnalysis = unitAnanlysisService.analysisUnits(university, questionJson);

        String cleanedUnit = unitAnalysis
                        .replace("```json", "")
                        .replace("```", "")
                        .trim();

        String frequencyAnalysis = analysisService.analyzeQuestions(questionJson);

        String cleanedFrequency = frequencyAnalysis
                        .replace("```json", "")
                        .replace("```", "")
                        .trim();

        DashboardDto response = new DashboardDto(cleanedUnit,cleanedFrequency);

        return ResponseEntity.ok(response);

    }

}
