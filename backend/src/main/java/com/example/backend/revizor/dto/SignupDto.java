package com.example.backend.revizor.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SignupDto{

    @NotBlank(message = "first name is required")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "last name is required")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotBlank(message = "email is required")
    @Email(message = "email should be valid")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "password is required")
    @Column(nullable = false)
    private String password;

    @NotBlank(message = "university is required")
    @Column(nullable = false)
    private String university;

}