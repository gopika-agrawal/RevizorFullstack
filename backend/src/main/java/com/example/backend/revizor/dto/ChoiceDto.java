package com.example.backend.revizor.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ChoiceDto {
    
    private MessageDto message;

}
