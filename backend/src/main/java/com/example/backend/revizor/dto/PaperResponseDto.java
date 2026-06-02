package com.example.backend.revizor.dto;

import java.util.List;

import lombok.Data;

@Data
public class PaperResponseDto {
    
    private List<PaperDto> papers;
}
