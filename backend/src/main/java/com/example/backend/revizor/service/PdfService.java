package com.example.backend.revizor.service;

import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.revizor.dto.PdfAnalysis;
import com.example.backend.revizor.entity.Question;
import com.example.backend.revizor.entity.UploadFile;
import com.example.backend.revizor.repository.UploadFileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PdfService {

    private final UploadFileRepository uploadFileRepository;

    private final UploadFileService uploadFileService;

    private final PdfAnalysisService pdfAnalysis;

    public String extractText(MultipartFile file) throws IOException {
        PDDocument document = Loader.loadPDF(file.getBytes());

        PDFTextStripper stripper = new PDFTextStripper();

        String text = stripper.getText(document);

        // text = text.replaceAll("\\s+", " ").trim();

        // System.out.println(text);

        PdfAnalysis response = pdfAnalysis.analyze(text);

        UploadFile uploadFile = UploadFile.builder()
                .fileName(file.getOriginalFilename())
                .subject(response.getSubject())
                .year(response.getYear())
                .extractedText(text)
                .build();


        List<Question> questions = response.getQuestions().stream()
                .map(questionText -> {
                    Question question = new Question();
                    question.setQuestionText(questionText);
                    question.setUploadFile(uploadFile);
                    return question;
                })
                .toList();

        uploadFile.setQuestions(questions);
        uploadFileRepository.save(uploadFile);

        uploadFileService.savePdfAnalysis(file, response, text);

        System.out.println(response);

        document.close();
        return text;
    }

}
