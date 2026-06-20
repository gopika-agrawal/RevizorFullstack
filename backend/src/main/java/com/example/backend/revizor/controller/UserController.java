package com.example.backend.revizor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.service.JwtService;
import com.example.backend.revizor.service.UserService;

import jakarta.validation.Valid;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.revizor.dto.AuthResponseDto;
import com.example.backend.revizor.dto.SignupDto;
import com.example.backend.revizor.dto.UserDto;
import com.example.backend.revizor.entity.Users;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@Slf4j
@Tag(name = "User APIs", description = "User Registration and Authentication")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://revizor-ai.vercel.app"
})
public class UserController {

    private final UserService userService;

    private final JwtService jwtService;

    @Operation(summary = "Register User", description = "Creates a new user account")
    @PostMapping
    public ResponseEntity<AuthResponseDto> createUser(@RequestBody @Valid SignupDto dto) {

        log.info("Signup request received for email: {}", dto.getEmail());

        Users savedUser = userService.createUser(dto);

        String token = jwtService.generateToken(savedUser.getEmail());

        log.info("User registered successfully: {}", dto.getEmail());
        
        return ResponseEntity
                .ok(new AuthResponseDto("Signup successful", savedUser.getId(), savedUser.getUniversity(), token));
    
    }

    @Operation(summary = "Login User", description = "Authenticates user using email and password")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> logInUser(@RequestBody @Valid UserDto userDto) {

        log.info("Login attempt for email: {}", userDto.getEmail());
        
        Users user = userService.loginUser(userDto);

        String token = jwtService.generateToken(user.getEmail());

        log.info("Login successful for email: {}", userDto.getEmail());

        return ResponseEntity.ok(new AuthResponseDto("Login successful", user.getId(), user.getUniversity(),token));
    }

}