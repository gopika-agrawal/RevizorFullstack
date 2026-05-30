package com.example.backend.revizor.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PdfAnalysis {
    
    private String subject;

    private String year;

    private List<String> questions;
}
