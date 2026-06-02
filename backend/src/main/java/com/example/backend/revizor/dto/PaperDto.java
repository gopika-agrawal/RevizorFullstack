package com.example.backend.revizor.dto;

import java.util.List;

import lombok.Data;

@Data
public class PaperDto {
    
    private String year;

    private List<String> questions;
}
