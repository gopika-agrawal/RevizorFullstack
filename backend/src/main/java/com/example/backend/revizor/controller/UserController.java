package com.example.backend.revizor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.service.UserService;

import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.revizor.entity.Users;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
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

}