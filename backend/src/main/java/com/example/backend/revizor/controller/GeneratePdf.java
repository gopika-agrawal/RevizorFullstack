package com.example.backend.revizor.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.entity.Question;
import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.repository.QuestionRepository;
import com.example.backend.revizor.repository.UserRepository;
import com.example.backend.revizor.service.AnswerGenerationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/answer-pdf")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GeneratePdf {

    private final AnswerGenerationService answerGenerationService;

    @PostMapping("/pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody String university, @RequestBody String frequencyJson) throws Exception{
        
        byte[] pdf = answerGenerationService.generateAnswers(university, frequencyJson);

        return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_DISPOSITION,
                                "attachments; filename=RevizorAnswers.pdf")
                                .contentType(MediaType.APPLICATION_PDF)
                                .body(pdf);
    }

}
