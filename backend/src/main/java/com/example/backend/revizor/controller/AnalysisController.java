package com.example.backend.revizor.controller;

import org.springframework.web.bind.annotation.RestController;

// import com.example.backend.revizor.dto.FrequencyDto;
import com.example.backend.revizor.dto.QuestionYearDto;
import com.example.backend.revizor.repository.QuestionRepository;
import com.example.backend.revizor.service.AnalysisService;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import com.example.backend.revizor.entity.Question;

@RestController
@RequestMapping("/analysis")
@RequiredArgsConstructor
public class AnalysisController {
    
    private final AnalysisService analysisService;

    private final QuestionRepository questionRepository;

    private final ObjectMapper objectMapper;

    @GetMapping("/frequency")
    public ResponseEntity<?> getFrequency() throws Exception {

        List<Question> questions = questionRepository.findAll();

        List<QuestionYearDto> input = questions.stream()
                                            .map(q -> new QuestionYearDto(q.getQuestionText(), q.getYear()))
                                            .toList();

        String questionJson = objectMapper.writeValueAsString(input);

        String geminiResponse = analysisService.analyzeQuestions(questionJson);

        String cleanedResponse =
            geminiResponse
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

        return ResponseEntity.ok(cleanedResponse);
    }

}
