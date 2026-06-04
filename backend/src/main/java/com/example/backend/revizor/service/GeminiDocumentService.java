package com.example.backend.revizor.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GeminiDocumentService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String parseExamPaper(MultipartFile file) throws InterruptedException {

        Client client = Client.builder()
                .apiKey(apiKey)
                .build();

        String prompt = """
                        You are an academic exam paper parser.

                Extract:

                1. Subject
                2. Year
                3. Actual exam questions only

                Rules:

                - Ignore section headings.
                - Ignore marks distribution.
                - Ignore instructions such as:
                  "Attempt all questions"
                  "Attempt any three"
                  "Attempt any one part"
                  "SECTION A"
                  "SECTION B"
                  "SECTION C"
                - Ignore question numbering.
                - Return only meaningful academic questions.
                - Remove prefixes like:
                  1.
                  2.
                  (a)
                  (b)
                  (i)
                  (ii)
                - Preserve the full question text.
                - Do not summarize.
                - Do not rewrite.

                Return valid JSON only.

                {
                  "subject": "",
                  "year": "",
                  "questions": []
                }

                Exam Paper Text:

                %s
                        """.formatted(file);

        // GenerateContentResponse response =
        // client.models.generateContent("gemini-2.5-flash", prompt, null);

        // return response.text();

        for (int i = 0; i < 3; i++) {
            try {
                GenerateContentResponse response = client.models.generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null);

                return response.text();

            } catch (Exception e) {

                if (i == 2) {
                    throw e;
                }

                Thread.sleep(3000);
            }
        }
        return "fine";

    }

}
