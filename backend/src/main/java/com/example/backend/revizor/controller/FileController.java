package com.example.backend.revizor.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.revizor.dto.PaperDto;
import com.example.backend.revizor.dto.PaperResponseDto;
import com.example.backend.revizor.dto.QuestionExtraction;
import com.example.backend.revizor.entity.Question;
import com.example.backend.revizor.entity.UploadFile;
import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.repository.QuestionRepository;
import com.example.backend.revizor.repository.UploadFileRepository;
import com.example.backend.revizor.repository.UserRepository;
import com.example.backend.revizor.service.GeminiService;
import com.example.backend.revizor.service.PdfService;

import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    private final PdfService pdfService;
    // private final UploadFile uploadFile;
    private final UploadFileRepository uploadFileRepository;
    private final GeminiService geminiService;

    ObjectMapper objectMapper = new ObjectMapper();

    private final QuestionRepository questionRepository;

    private final UserRepository userRepository;

    private String extractYear(String fileName) {
        Pattern pattern = Pattern.compile("(20\\d{2})");
        Matcher matcher = pattern.matcher(fileName);
        if (matcher.find()) {
            return matcher.group();
        }
        return "Unknown Year";
    }

    @Transactional
    @PostMapping("/{id}")
    public ResponseEntity<Map<String, String>> uploadFiles(
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files) throws IOException, InterruptedException {

        questionRepository.deleteByUserId(id);

        uploadFileRepository.deleteByUserId(id);

        StringBuilder allText = new StringBuilder();

        Users user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        for (MultipartFile file : files) {

            String year = extractYear(file.getOriginalFilename());

            String text = pdfService.extractText(file);

            if (text == null || text.trim().isEmpty()) {
                System.out.println(
                        "Skipping scanned PDF: "
                                + file.getOriginalFilename());
                continue;
            }

            allText.append("""
                    =========================
                    YEAR: %s
                    =========================

                    %s

                    END OF PAPER

                    """
                    .formatted(
                            year,
                            text));

        }

        System.out.println("Input Length = " + allText.length());

        System.out.println("Extracted Text: " + allText.toString());

        String geminiResponse = geminiService.extractQuestions(allText.toString());

        String cleanedResponse = geminiResponse
                .replace("```json", "")
                .replace("```", "")
                .trim();

        System.out.println("Cleaned Gemini Response: " + cleanedResponse);

        // QuestionExtraction extraction = objectMapper.readValue(
        //         cleanedResponse,
        //         QuestionExtraction.class);

        PaperResponseDto extraction = objectMapper.readValue(cleanedResponse, PaperResponseDto.class);

        for(PaperDto paper : extraction.getPapers()){

            UploadFile uploadFile = UploadFile.builder()
                                   .year(paper.getYear())
                                   .subject("Unknown Subject")
                                   .user(user)
                                   .build();
            uploadFileRepository.save(uploadFile);

            for(String q : paper.getQuestions()){
                Question question = Question.builder()
                                        .questionText(q)
                                        .year(paper.getYear())
                                        .user(user)
                                        .build();
                questionRepository.save(question);
            }
        }

        Map<String, String> response = new HashMap<>();

        response.put("message", "Files uploaded successfully");

        return ResponseEntity.ok(response);
    }

}
