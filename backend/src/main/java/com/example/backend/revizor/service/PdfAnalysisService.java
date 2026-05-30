package com.example.backend.revizor.service;

import com.example.backend.revizor.dto.PdfAnalysis;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import java.util.regex.Matcher;

@Service
public class PdfAnalysisService {

    private String extractSubject(String text) {
        
        Pattern pattern =  Pattern.compile(
                    "THEORY EXAMINATION \\d{4}-\\d{4}\\s*(.*?)\\s*Time:",
                    Pattern.DOTALL
            );

        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return "Subject not found";
    }

    private String extractYear(String text){

        Pattern pattern =
                Pattern.compile("\\d{4}-\\d{4}");

        Matcher matcher =
                pattern.matcher(text);

        if(matcher.find()){
            return matcher.group();
        }

        return "Unknown Year";

    }


    private List<String> extractQuestions(String text){

    List<String> questions =
            new ArrayList<>();

    String[] lines = text.split("\\n");

    Pattern pattern = Pattern.compile(
        "^\\(?[a-jA-J]\\)?\\.?\\s+(.*)"
    );

    for(String line : lines){

        line = line.trim();

        Matcher matcher = pattern.matcher(line);

        if(matcher.find()){
            questions.add(
                matcher.group(1).trim()
            );
        }
    }

    return questions;
}
        
    public PdfAnalysis analyze(String text) {
        String subject = extractSubject(text);
        String year = extractYear(text);
        List<String> questions = extractQuestions(text);
        return new PdfAnalysis(subject, year, questions);
    }

}
