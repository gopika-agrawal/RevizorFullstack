package com.example.backend.revizor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDto {

    @Schema(description = "Question", example = "Normalization")
    private String question;

    @Schema(description = "Generated university answer")
    private String answer;
}
