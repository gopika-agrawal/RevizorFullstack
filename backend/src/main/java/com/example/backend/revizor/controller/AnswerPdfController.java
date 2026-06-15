package com.example.backend.revizor.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.dto.AnswerPdfDto;
import com.example.backend.revizor.service.AnswerGenerationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Answer APIs", description = "Generate Exam Answer PDF")
@RestController
@RequestMapping("/answer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AnswerPdfController {

        private final AnswerGenerationService answerGenerationService;

        @Operation(summary = "Generate Answer PDF", description = "Generates university-specific answer PDF for important questions")
        @PostMapping("/pdf")
        public ResponseEntity<byte[]> generatePdf(@RequestBody @Valid AnswerPdfDto answerPdfDto) throws Exception {

                // String university = answerPdfDto.getUniversity();

                // String frequencyJson = answerPdfDto.getFrequencyJson();

                // byte[] pdf = answerGenerationService.generateAnswers(university,
                // frequencyJson);

                // return ResponseEntity.ok()
                // .header(HttpHeaders.CONTENT_DISPOSITION,
                // "attachment; filename=RevizorAnswers.pdf")
                // .contentType(MediaType.APPLICATION_PDF)
                // .body(pdf);

                try {

                        String university = answerPdfDto.getUniversity();

                        String subject = answerPdfDto.getSubject();

                        String frequencyJson = answerPdfDto.getFrequencyJson();

                        byte[] pdf = answerGenerationService.generateAnswers(
                                        university,
                                        subject,
                                        frequencyJson);

                        return ResponseEntity.ok()
                                        .header(
                                                        HttpHeaders.CONTENT_DISPOSITION,
                                                        "attachment; filename=RevizorAnswers.pdf")
                                        .contentType(MediaType.APPLICATION_PDF)
                                        .body(pdf);

                } catch (Exception e) {

                        e.printStackTrace(); // IMPORTANT

                        throw new RuntimeException(e);
                }
        }

}
