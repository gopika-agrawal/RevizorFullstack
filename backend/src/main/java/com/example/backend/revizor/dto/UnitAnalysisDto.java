package com.example.backend.revizor.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitAnalysisDto {

    @Schema(description = "Unit name", example = "Unit 3")
    private String unit;

    @Schema(description = "Topics covered in this unit")
    private List<String> topics;

    @Schema(description = "Total questions from this unit", example = "12")
    private Integer questionCount;
}
