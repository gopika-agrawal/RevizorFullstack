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

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;

    private final QuestionRepository questionRepository;

    private final ObjectMapper objectMapper;

    private final UnitAnalysisService unitAnalysisService;

    private final FrequencyAnalysisService frequencyAnalysisService;

    public DashboardDto generateInsights(Long userId) throws Exception{
        Users user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

        String university = user.getUniversity();

        List<Question> questions = questionRepository.findByUserId(userId);

        if(questions.isEmpty()){
            throw new RuntimeException("No questions found");
        }

        List<QuestionYearDto> input = questions.stream().map(q -> 
            new QuestionYearDto(q.getQuestionText(),q.getYear())
        ).toList();


        String questionJson = objectMapper.writeValueAsString(input);

        String unitAnalysis = unitAnalysisService.generateUnitAnalysis(university, questionJson);

        if(unitAnalysis == null || unitAnalysis.isBlank()){
            throw new RuntimeException("Failed to generate unit analysis");
        }

        String cleanedUnit = unitAnalysis
                        .replace("```json", "")
                        .replace("```", "")
                        .trim();

        String frequencyAnalysis = frequencyAnalysisService.analyzeQuestions(questionJson);

        if(frequencyAnalysis == null || frequencyAnalysis.isBlank()){
            throw new RuntimeException("Failed to generate frequency analysis");
        }

        String cleanedFrequency = frequencyAnalysis
                        .replace("```json", "")
                        .replace("```", "")
                        .trim();

        DashboardDto response = new DashboardDto(cleanedUnit,cleanedFrequency);

        return response;

    }
}
