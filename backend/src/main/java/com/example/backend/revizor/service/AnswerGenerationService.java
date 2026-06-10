package com.example.backend.revizor.service;

import java.io.ByteArrayOutputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnswerGenerationService {

    private final GroqService groqService;
    
    @Value("${groq.api.key}")
    private String apiKey;


    private byte[] createPdf(String answerJson) throws Exception {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        Document document = new Document();
        PdfWriter.getInstance(document, out);

        document.open();

        document.add(new Paragraph("REVIZOR ANSWER BOOK"));

        document.add(new Paragraph(" "));

        document.add(new Paragraph(answerJson));

        document.close();

        return out.toByteArray();
    }


    public byte[] generateAnswers(String university, String questionJson) throws Exception{
        
        String prompt = """
            You are an expert university professor, examiner, and academic content writer.

            University: %s

            Your task is to generate high-quality examination answers for EVERY question provided.

            IMPORTANT RULES:

            1. Generate an answer for EVERY question.
            2. Do NOT skip any question.
            3. Do NOT summarize questions.
            4. Do NOT merge questions.
            5. Answer each question independently.

            ANSWER QUALITY:

            - Suitable for university semester examinations.
            - Write answers that can score full marks.
            - Use clear academic language.
            - Use proper headings and subheadings.
            - Use bullet points wherever appropriate.
            - Include examples when useful.
            - Include definitions before explanations.
            - Include advantages, disadvantages, applications when relevant.
            - Include formulas if required.
            - Include diagrams explanation in text if diagrams are applicable.
            - Keep answers detailed and structured up to 10-15 marks.

            OUTPUT FORMAT:

            Return ONLY valid JSON.

            [
            {
                "question": "Question text",
                "answer": "Detailed answer"
            }
            ]

            DO NOT RETURN:

            - Markdown
            - Explanations
            - Notes
            - Python code
            - Extra text
            - ```json blocks

            Questions:

            %s
            """.formatted(university, questionJson);

        
        String response = groqService.ask(prompt);

        String cleaned =
                response
                        .replace("```json", "")
                        .replace("```", "")
                        .trim();

        return createPdf(cleaned);

    }

}
