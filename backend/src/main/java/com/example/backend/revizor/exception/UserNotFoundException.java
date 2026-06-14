package com.example.backend.revizor.exception;

public class UserNotFoundException extends RuntimeException {
    
    public UserNotFoundException(String message){
        super(message);
    }
    
}
