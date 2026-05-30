package com.example.backend.revizor.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.revizor.dto.PdfAnalysis;
import com.example.backend.revizor.entity.Question;
import com.example.backend.revizor.entity.UploadFile;
import com.example.backend.revizor.repository.UploadFileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadFileService {

    private final UploadFileRepository uploadFileRepository;

    public UploadFile savePdfAnalysis(MultipartFile file, PdfAnalysis analysis, String extractedText) {
        UploadFile uploadFile = UploadFile.builder()
                .fileName(file.getOriginalFilename())
                .subject(analysis.getSubject())
                .year(analysis.getYear())
                .extractedText(extractedText)
                .build();

        List<Question> questions = analysis.getQuestions().stream()
                .map(questionText -> 
                    Question.builder()
                            .questionText(questionText)
                            .uploadFile(uploadFile)
                            .build()
                )
                .toList();

        // uploadFile.setQuestions(questions);
        return uploadFileRepository.save(uploadFile);
    }

}
