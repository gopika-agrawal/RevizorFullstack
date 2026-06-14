package com.example.backend.revizor.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.revizor.dto.DashboardDto;
import com.example.backend.revizor.service.DashboardService;

import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    ObjectMapper objectMapper = new ObjectMapper();


    @GetMapping("/{userId}")
    public ResponseEntity<DashboardDto> generateInsights(@PathVariable Long userId) throws Exception {

        

        return ResponseEntity.ok(dashboardService.generateInsights(userId));

    }

}
