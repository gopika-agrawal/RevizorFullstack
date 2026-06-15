package com.example.backend.revizor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDto {

    @Schema(description = "Operation result message", example = "Login successful")
    private String message;

    @Schema(description = "Unique user identifier", example = "1")
    private Long userId;

    @Schema(description = "University of logged in user", example = "Dr. A.P.J. Abdul Kalam Technical University")
    private String university;

    @Schema(description = "Authentication token")
    private String token;

}
