package com.example.backend.revizor.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.revizor.dto.PaperDto;
import com.example.backend.revizor.dto.PaperResponseDto;
import com.example.backend.revizor.entity.Question;
import com.example.backend.revizor.entity.UploadFile;
import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.exception.FileProcessingException;
import com.example.backend.revizor.exception.UserNotFoundException;
import com.example.backend.revizor.repository.QuestionRepository;
import com.example.backend.revizor.repository.UploadFileRepository;
import com.example.backend.revizor.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadService {

    private final PdfService pdfService;
    private final UploadFileRepository uploadFileRepository;
    private final GroqService groqService;
    private final ObjectMapper objectMapper;
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
    public void processFiles(Long id, List<MultipartFile> files) throws Exception {

        if(files == null || files.isEmpty()){
            throw new FileProcessingException("Please upload at least one PDF");
        }
        questionRepository.deleteByUserId(id);

        uploadFileRepository.deleteByUserId(id);

        StringBuilder allText = new StringBuilder();

        Users user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        for (MultipartFile file : files) {

            if(!"application/pdf".equals(file.getContentType())){
                throw new FileProcessingException("Only PDF files are allowed");
            }

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

        // String geminiResponse = geminiService.extractQuestions(allText.toString());

        String groqResponse = groqService.extractQuestions(allText.toString());

        if(groqResponse == null || groqResponse.isBlank()){
            throw new FileProcessingException("Failed to process PDF");
        }


        String cleanedResponse = groqResponse
                .replace("```json", "")
                .replace("```", "")
                .trim();

        System.out.println("Cleaned Gemini Response: " + cleanedResponse);

        PaperResponseDto extraction = objectMapper.readValue(cleanedResponse, PaperResponseDto.class);

        for(PaperDto paper : extraction.getPapers()){

            UploadFile uploadFile = UploadFile.builder()
                                    .fileName("Combined Upload")
                                    .rawText(allText.toString())
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

    }

}