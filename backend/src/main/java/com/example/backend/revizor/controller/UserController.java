package com.example.backend.revizor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.revizor.dto.AuthResponseDto;
import com.example.backend.revizor.dto.SignupDto;
import com.example.backend.revizor.dto.UserDto;
import com.example.backend.revizor.entity.Users;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<AuthResponseDto> createUser(@RequestBody @Valid SignupDto dto) {
        Users savedUser = userService.createUser(dto);

        return ResponseEntity.ok(new AuthResponseDto("Signup successful", savedUser.getId(), savedUser.getUniversity()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> logInUser(@RequestBody @Valid UserDto userDto) {

        Users user = userService.loginUser(userDto);

        return ResponseEntity.ok(new AuthResponseDto("Login successful", user.getId(), user.getUniversity()));
    }

}