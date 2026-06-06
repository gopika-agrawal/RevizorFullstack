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

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/answer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GeneratePdf {

    private final AnswerGenerationService answerGenerationService;

    @PostMapping("/pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody AnswerPdfDto answerPdfDto) throws Exception{


        System.out.println("ANSWER PDF CONTROLLER HIT");
        
        String university = answerPdfDto.getUniversity();

        String frequencyJson = answerPdfDto.getFrequencyJson();
        
        byte[] pdf = answerGenerationService.generateAnswers(university, frequencyJson);

        System.out.println("Pdf Generated Successfully");

        return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_DISPOSITION,
                                "attachment; filename=RevizorAnswers.pdf")
                                .contentType(MediaType.APPLICATION_PDF)
                                .body(pdf);
    }

}
