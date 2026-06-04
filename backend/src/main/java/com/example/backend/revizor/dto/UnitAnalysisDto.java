package com.example.backend.revizor.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitAnalysisDto {

    private String unit;

    private List<String> topics;

    private Integer questionCount;

}
