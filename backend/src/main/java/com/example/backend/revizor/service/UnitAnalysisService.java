package com.example.backend.revizor.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UnitAnalysisService {

    private final GroqService groqService;

    public String generateUnitAnalysis(String university, String questionJson) throws Exception {

        String prompt = """
                You are an expert university syllabus analyzer.

                University: %s

                IMPORTANT RULES:

                1. Use ONLY the OFFICIAL syllabus structure of the specified university.
                2. DO NOT invent new units.
                3. DO NOT rename units.
                4. DO NOT merge units.
                5. DO NOT split units.
                6. Map every question to the most appropriate official syllabus unit.
                7. Group semantically similar questions together.
                8. Count how many questions belong to each unit.
                9. Ignore duplicate wording differences such as:

                * "Explain Normalization"
                * "What is Normalization?"
                * "Discuss Normalization"
                  Treat them as the same topic.

                OUTPUT REQUIREMENTS:

                * Return ONLY valid JSON.
                * No explanations.
                * No markdown.
                * No comments.
                * No code.
                * No Python.
                * No Java.
                * No text before JSON.
                * No text after JSON.

                The response MUST start with '[' and end with ']'.

                JSON FORMAT:

                [
                {
                "unit": "Unit I",
                "topics": [
                "Topic 1",
                "Topic 2"
                ],
                "questionCount": 0,
                }
                ]

                ANALYSIS TASK:

                For the given university:

                1. Identify the official syllabus units.
                2. Classify every question into the correct official unit.
                3. Count questions per unit.
                4. Return only the final JSON.

                QUESTIONS:

                %s

                                """
                .formatted(
                        university,
                        questionJson);

        String response = groqService.ask(prompt);

        return response;

    }

}
