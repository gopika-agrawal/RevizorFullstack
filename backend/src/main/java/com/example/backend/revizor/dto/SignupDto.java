package com.example.backend.revizor.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupDto {

    @Schema(description = "User first name", example = "Xyz")
    @NotBlank(message = "first name is required")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Schema(description = "User last name", example = "Abc")
    @NotBlank(message = "last name is required")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Schema(description = "User email", example = "xyz@gmail.com")
    @NotBlank(message = "email is required")
    @Email(message = "email should be valid")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@gmail\\.com$", message = "email must be a Gmail address")
    @Column(nullable = false, unique = true)
    private String email;

    @Schema(description = "Strong password", example = "Xyz@1234")
    @NotBlank(message = "password is required")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$", message = "password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character")
    @Column(nullable = false)
    private String password;

    @Schema(description = "University name", example = "Dr. A.P.J. Abdul Kalam Technical University")
    @NotBlank(message = "university is required")
    @Column(nullable = false)
    private String university;
}
