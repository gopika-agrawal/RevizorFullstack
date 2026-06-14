package com.example.backend.revizor.exception;

public class InvalidCredentialsException
        extends RuntimeException {

    public InvalidCredentialsException(
            String message) {

        super(message);
    }
}