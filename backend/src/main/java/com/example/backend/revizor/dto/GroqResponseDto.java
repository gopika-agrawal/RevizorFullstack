package com.example.backend.revizor.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class GroqResponseDto {
    
    private List<ChoiceDto> choices;

}
