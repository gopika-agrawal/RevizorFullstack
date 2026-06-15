package com.example.backend.revizor.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.backend.revizor.dto.GroqResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;
    

    private final RestTemplate restTemplate;
    // private final ObjectMapper objectMapper;

    public String extractQuestions(String rawText) throws Exception {

        String prompt = """
                You are an academic exam paper parser.

                The input contains MULTIPLE exam papers.

                Each paper starts with:

                YEAR: XXXX

                and ends with:

                END OF PAPER

                For EACH paper separately:

                1. Read only that paper.
                2. Extract actual exam questions.
                3. Ignore:

                - SECTION A
                - SECTION B
                - SECTION C
                - Marks
                - CO columns
                - Instructions
                - Attempt all questions
                - Attempt any three
                - Attempt any one part
                - Question numbering

                Return ONLY valid JSON.

                Format:

                {
                  "papers": [
                    {
                      "year": "2019",
                      "questions": [
                        "Question 1",
                        "Question 2"
                      ]
                    }
                  ]
                }

                Input:

                %s
                """.formatted(rawText);

        log.info("Sending request to Groq model");

        String response = ask(prompt);

        return response;
        

    }


    public String ask(String prompt) throws Exception{

        HttpHeaders headers = new HttpHeaders();


        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String,Object> requestBody = new HashMap<>();

        requestBody.put("temperature",0);

        log.debug("Model used: {}", "llama-3.3-70b-versatile");
        
        requestBody.put("model", "llama-3.3-70b-versatile");

        requestBody.put("messages",List.of(Map.of("role","user","content",prompt)));

        HttpEntity<Map<String,Object>> entity = new HttpEntity<>(requestBody,headers);

        String response = restTemplate.postForObject("https://api.groq.com/openai/v1/chat/completions", entity, String.class);

        log.info("Groq response received");

        GroqResponseDto dto = new ObjectMapper().readValue(response, GroqResponseDto.class);

        return dto.getChoices()
                .get(0)
                .getMessage()
                .getContent();
        
    }


}
