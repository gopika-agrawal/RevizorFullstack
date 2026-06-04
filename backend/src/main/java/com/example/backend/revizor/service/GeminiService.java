package com.example.backend.revizor.service;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GeminiService {

  @Value("${gemini.api.key}")
  private String apiKey;

  public String extractQuestions(String rawText) {

    Client client = Client.builder()
        .apiKey(apiKey)
        .build();

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

    GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", prompt, null);

    return response.text();

  }

}
