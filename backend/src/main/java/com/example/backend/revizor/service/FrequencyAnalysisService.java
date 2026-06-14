package com.example.backend.revizor.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FrequencyAnalysisService {

  private final GroqService groqService;

  public String analyzeQuestions(String questionJson) throws Exception {

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

    String response = groqService.ask(prompt);

    int start = response.indexOf("[");
    int end = response.lastIndexOf("]");

    String cleaned = response.substring(start, end+1);

    return cleaned;

  }
}