package com.example.backend.revizor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.service.UserService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.revizor.dto.UserDto;
import com.example.backend.revizor.entity.Users;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController{

    private final UserService userService;

    @GetMapping
    public List<Users> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping
    public Users createUser(@RequestBody @Valid Users user){
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> logInUser(@RequestBody @Valid UserDto userDto){
        Map<String,String> response = new HashMap<>();
        response.put("message", userService.loginUser(userDto));
        return ResponseEntity.ok(response);
    }

}