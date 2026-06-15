package com.example.backend.revizor.dto;

import java.util.List;

import lombok.Data;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FrequencyDto {

    @Schema(description = "Question text", example = "Normalization")
    private String question;

    @Schema(description = "Number of occurrences in PYQs", example = "5")
    private Integer frequency;

    @Schema(description = "Years in which question appeared")
    private List<String> years;

    @Schema(description = "Importance level", example = "HIGH")
    private String importance;
}
