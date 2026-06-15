package com.example.backend.revizor.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerPdfDto {

    @Schema(description = "University name", example = "AKTU")
    @NotBlank(message = "University is required")
    private String university;

    @Schema(description = "Subject Name", example = "DBMS")
    @NotBlank(message = "Subject is required")
    private String subject;

    @Schema(description = "Frequency analysis JSON")
    @NotBlank(message = "Frequency data is required")
    private String frequencyJson;
}