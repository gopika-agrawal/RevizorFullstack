package com.example.backend.revizor.dto;

import java.util.List;

import lombok.Data;

@Data
public class FrequencyDto {
    
    private String question;

    private Integer frequency;

    private List<String> years;

    private String importance;

}
