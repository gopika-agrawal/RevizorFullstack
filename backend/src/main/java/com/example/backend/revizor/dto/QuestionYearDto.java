package com.example.backend.revizor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionYearDto {

    @Schema(description = "Question text", example = "Explain Normalization")
    private String question;

    @Schema(description = "Year of occurrence", example = "2023")
    private String year;
}
