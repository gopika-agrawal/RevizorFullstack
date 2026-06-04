package com.example.backend.revizor.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class AnalysisService {

  @Value("${gemini.api.key}")
  private String apiKey;

  public String analyzeQuestions(String questionJson) {

    Client client = Client.builder()
        .apiKey(apiKey)
        .build();

    String prompt = """
        You are an expert university exam paper analyst.

        Your task is to identify repeated exam questions across multiple years.

        INPUT:
        You will receive a JSON array containing:
        - question
        - year

        RULES:

        1. Group SEMANTICALLY SIMILAR questions.

        2. Ignore wording differences.

        3. Ignore:
           - What is
           - Explain
           - Discuss
           - Describe
           - Write short notes on

        4. Questions testing the SAME CONCEPT must be grouped together.

        5. Create ONE canonical question name.

        6. Count frequency.

        7. Collect ALL years.

        8. Remove duplicate years.

        9. Sort by frequency descending.

        10. Importance:
            HIGH -> frequency >= 4
            MEDIUM -> frequency 2-3
            LOW -> frequency 1

        Return ONLY valid JSON.

        [
          {
            "question":"",
            "frequency":0,
            "years":[],
            "importance":""
          }
        ]

        DATA:

        %s
        """
        .formatted(questionJson);

    try {
      return client.models.generateContent(
          "gemini-2.5-flash",
          prompt,
          null)
          .text();

    } catch (Exception e) {

      System.out.println("2.5 Flash failed. Trying Lite...");

      return client.models.generateContent(
          "gemini-2.5-flash-lite",
          prompt,
          null)
          .text();
    }
  }
}