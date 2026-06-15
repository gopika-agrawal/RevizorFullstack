package com.example.backend.revizor.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(UserAlreadyExistsException.class)
        public ResponseEntity<Map<String, String>> handleUserAlreadyExists(
                        UserAlreadyExistsException ex) {

                return ResponseEntity
                                .status(HttpStatus.CONFLICT)
                                .body(Map.of(
                                                "message",
                                                ex.getMessage()));
        }

        @ExceptionHandler(InvalidCredentialsException.class)
        public ResponseEntity<Map<String, String>> handleInvalidCredentials(
                        InvalidCredentialsException ex) {

                return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of(
                                                "message",
                                                ex.getMessage()));
        }

        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<Map<String, String>> handleUserNotFound(
                        UserNotFoundException ex) {

                return ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(
                                                Map.of(
                                                                "message",
                                                                ex.getMessage()));
        }

        @ExceptionHandler(FileProcessingException.class)
        public ResponseEntity<Map<String, String>> handleFileProcessing(
                        FileProcessingException ex) {

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(
                                                Map.of(
                                                                "message",
                                                                ex.getMessage()));
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, String>> handleValidation(
                        MethodArgumentNotValidException ex) {

                Map<String, String> errors = new HashMap<>();

                ex.getBindingResult()
                                .getFieldErrors()
                                .forEach(error ->

                                errors.put(
                                                error.getField(),
                                                error.getDefaultMessage()));

                return ResponseEntity
                                .badRequest()
                                .body(errors);
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<Map<String, String>> handleException(
                        Exception ex) {

                                log.error("Unhandled exception occurred", ex);

                ex.printStackTrace();

                Map<String, String> response = new HashMap<>();

                response.put(
                                "message",
                                ex.getMessage());

                return ResponseEntity
                                .status(500)
                                .body(response);
        }

}