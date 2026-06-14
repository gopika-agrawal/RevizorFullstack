package com.example.backend.revizor.exception;

public class UserAlreadyExistsException
        extends RuntimeException {

    public UserAlreadyExistsException(
            String message) {

        super(message);
    }
}