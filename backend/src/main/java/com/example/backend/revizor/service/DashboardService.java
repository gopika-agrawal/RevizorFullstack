package com.example.backend.revizor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.revizor.dto.DashboardDto;
import com.example.backend.revizor.dto.QuestionYearDto;
import com.example.backend.revizor.entity.Question;
import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.exception.UserNotFoundException;
import com.example.backend.revizor.repository.QuestionRepository;
import com.example.backend.revizor.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;

    private final QuestionRepository questionRepository;

    private final UnitAnalysisService unitAnalysisService;

    private final FrequencyAnalysisService frequencyAnalysisService;

    public DashboardDto generateInsights(Long userId) throws Exception {

        log.info("Generating dashboard for userId: {}", userId);

        Users user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

        String university = user.getUniversity();

        List<Question> questions = questionRepository.findByUserId(userId);

        log.debug("Questions found: {}", questions.size());

        if (questions.isEmpty()) {
            throw new RuntimeException("No questions found");
        }

        List<QuestionYearDto> input = questions.stream().map(q -> new QuestionYearDto(q.getQuestionText(), q.getYear()))
                .toList();

        ObjectMapper objectMapper = new ObjectMapper();

        String questionJson = objectMapper.writeValueAsString(input);

        log.debug("Sending {} questions for unit analysis", input.size());

        log.info("Generating unit analysis");

        String unitAnalysis = unitAnalysisService.generateUnitAnalysis(university, questionJson);

        
        if (unitAnalysis == null || unitAnalysis.isBlank()) {
            log.warn("Failed to generate unit analysis");
            throw new RuntimeException("Failed to generate unit analysis");
        }

        log.info("Unit analysis completed");

        String cleanedUnit = unitAnalysis
                .replace("```json", "")
                .replace("```", "")
                .trim();

        log.info("Generating frequency analysis");

        String frequencyAnalysis = frequencyAnalysisService.analyzeQuestions(questionJson);

        if (frequencyAnalysis == null || frequencyAnalysis.isBlank()) {
            log.warn("Failed to generate frequency analysis");
            throw new RuntimeException("Failed to generate frequency analysis");
        }

        log.info("Frequency analysis completed");

        String cleanedFrequency = frequencyAnalysis
                .replace("```json", "")
                .replace("```", "")
                .trim();

        DashboardDto response = new DashboardDto(cleanedUnit, cleanedFrequency);

        log.info("Dashboard generated successfully");

        return response;

    }
}
