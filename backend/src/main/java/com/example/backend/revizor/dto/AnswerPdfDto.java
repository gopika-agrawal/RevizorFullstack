package com.example.backend.revizor.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AnswerPdfDto {

    @NotBlank(message = "University is required")
    private String university;

    @NotBlank(message = "Frequency data is required")
    private String frequencyJson;
}