package com.example.backend.revizor.controller;

import com.example.backend.revizor.service.UploadService;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Slf4j
@Tag(name = "File APIs", description = "Upload and Process PYQ PDFs")
@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    private final UploadService uploadService;

    @Operation(summary = "Upload Previous Year Papers", description = "Uploads multiple PDF files, extracts questions and stores them in database")
    @Transactional
    @PostMapping("/{id}")
    public ResponseEntity<Map<String, String>> uploadFiles(
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files, @RequestParam("subject") String subject)
            throws Exception {

        log.info("File upload request received for userId: {}", id);

        uploadService.processFiles(id, files, subject);

        log.info("{} files uploaded by user {}", files.size(), id);

        return ResponseEntity.ok(Map.of("message", "Files uploaded successfully"));
    }

}
