package com.example.backend.revizor.controller;

import com.example.backend.revizor.service.UploadService;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    

    

    private final UploadService uploadService;

    @Transactional
    @PostMapping("/{id}")
    public ResponseEntity<Map<String, String>> uploadFiles(
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files) throws Exception {

        uploadService.processFiles(id, files);

        
        return ResponseEntity.ok(Map.of("message","Files uploaded successfully"));
    }

}
