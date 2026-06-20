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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Dashboard APIs", description = "Generate Insights Dashboard")
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://revizor-ai.vercel.app"
})
public class DashboardController {

    private final DashboardService dashboardService;

    ObjectMapper objectMapper = new ObjectMapper();


    @Operation(summary = "Generate Dashboard", description = "Generates Unit Analysis and Frequency Analysis for a user")
    @GetMapping("/{userId}")
    public ResponseEntity<DashboardDto> generateInsights(@PathVariable Long userId) throws Exception {

        return ResponseEntity.ok(dashboardService.generateInsights(userId));

    }

}
