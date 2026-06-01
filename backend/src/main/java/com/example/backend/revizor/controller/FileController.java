package com.example.backend.revizor.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFiles(
            @RequestParam("files") List<MultipartFile> files) throws IOException {

        files.forEach((file) -> {
            System.out.println(file.getOriginalFilename());
            System.out.println(file.getSize());
        });
        

        Map<String, String> response = new HashMap<>();

        response.put("message", "Files uploaded successfully");

        return ResponseEntity.ok(response);
    }

}
