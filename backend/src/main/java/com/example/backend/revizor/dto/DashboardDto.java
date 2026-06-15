package com.example.backend.revizor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDto {

    @Schema(description = "Unit-wise analysis generated from PYQs")
    private String unitAnalysis;

    @Schema(description = "Frequency analysis generated from PYQs")
    private String frequencyAnalysis;
}
