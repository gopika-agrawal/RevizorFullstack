package com.example.backend.revizor.service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.revizor.dto.FrequencyDto;
import com.example.backend.revizor.exception.FileProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnswerGenerationService {

        private final GroqService groqService;

        private String generateSingleAnswer(
                        String university,
                        String subject,
                        String question) throws Exception {

                log.info("Generating answer PDF for subject: {}", subject);

                // String prompt = """
                // You are a Senior University Professor, Subject Expert, Paper Setter,
                // Examiner, and Top-Ranking University Student.

                // UNIVERSITY:
                // %s

                // SUBJECT:
                // %s

                // QUESTION:
                // %s

                // IMPORTANT:

                // Assume the examiner has asked this question
                // for 10-15 marks in a B.Tech university examination.

                // Do NOT generate notes.

                // Do NOT generate summaries.

                // Generate a full-scoring exam answer.

                // Minimum answer length:
                // 1000 words.

                // For DBMS topics include all standard concepts
                // expected in university exams.

                // For example:

                // Normalization:
                // - Unnormalized Form
                // - 1NF
                // - 2NF
                // - 3NF
                // - BCNF
                // - Example table conversion

                // Concurrency Control:
                // - Serializability
                // - Locking
                // - Shared Lock
                // - Exclusive Lock
                // - Two Phase Locking
                // - Timestamp Protocol
                // - Validation Protocol
                // - Deadlock

                // ER Model:
                // - Entities
                // - Attributes
                // - Relationships
                // - ER Diagram

                // Relational Algebra:
                // - All operators
                // - Examples

                // Never skip these concepts.

                // YOUR TASK:

                // Generate the BEST POSSIBLE UNIVERSITY EXAM ANSWER that can score FULL MARKS
                // in semester examinations.

                // Before writing the answer:

                // 1. Analyze the question carefully.
                // 2. Identify what the examiner is actually asking.
                // 3. Determine whether the question requires:

                // * Definition
                // * Theory
                // * Architecture
                // * Diagram
                // * Flowchart
                // * Working
                // * Example
                // * Advantages
                // * Disadvantages
                // * Applications
                // * Comparison
                // * Classification / Types
                // * Algorithm
                // * Mathematical Formula
                // * Case Study
                // 4. For university theory subjects
                // (DBMS, OS, CN, OOPs, SE, Cloud Computing)

                // ALWAYS include:

                // - Definition
                // - Detailed Explanation
                // - Architecture/Working (if applicable)
                // - Diagram (if applicable)
                // - Flowchart (if applicable)
                // - Types/Classifications
                // - Advantages
                // - Disadvantages
                // - Applications
                // - Real World Example
                // - Conclusion

                // Do NOT skip sections to save tokens.

                // ANSWER REQUIREMENTS:

                // * Examination-oriented answer.
                // * Suitable for 10-15 marks.
                // * Written exactly like a topper student.
                // * Structured for maximum scoring.
                // * Detailed but easy to revise.
                // * Use proper academic language.
                // * Use complete sentences.
                // * Use headings and subheadings.
                // * Use numbered points.
                // * Use bullet points wherever useful.
                // * Include examples whenever possible.
                // * Include real-world applications whenever possible.
                // * Include memory tricks if useful.
                // * Include examiner-friendly formatting.

                // VERY IMPORTANT:

                // The answer should NOT look like AI-generated content.

                // It should look like:

                // * Notes prepared by a university topper.
                // * Model answer written by a professor.
                // * Examination guide created for scoring full marks.

                // DIAGRAM RULES:

                // If a diagram is applicable:

                // Generate a clean ASCII diagram.

                // Example:

                // +----------------+
                // | USER |
                // +----------------+
                // |
                // v
                // +----------------+
                // | DBMS |
                // +----------------+
                // |
                // v
                // +----------------+
                // | DATABASE |
                // +----------------+

                // FLOWCHART RULES:

                // If a flowchart is applicable:

                // Generate a clean ASCII flowchart.

                // Example:

                // Start
                // |
                // v
                // Input
                // |
                // v
                // Process
                // |
                // v
                // Output
                // |
                // v
                // End

                // TABLE RULES:

                // If comparison is applicable:

                // Use plain text tables.

                // Example:

                // | Feature | DBMS | File System |
                // | -------- | ---- | ----------- |
                // | Security | High | Low |
                // | Backup | Yes | No |

                // ADVANTAGES / DISADVANTAGES:

                // Whenever applicable:

                // Advantages:
                // 1.
                // 2.
                // 3.

                // Disadvantages:
                // 1.
                // 2.
                // 3.

                // TYPES / CLASSIFICATION:

                // Whenever applicable:

                // Type 1:
                // Explanation

                // Type 2:
                // Explanation

                // APPLICATIONS:

                // Whenever applicable:

                // 1.
                // 2.
                // 3.
                // 4.

                // CONCLUSION:

                // Always end with a strong exam-style conclusion.

                // EXAMINER BONUS RULES:

                // Whenever relevant:

                // * Mention practical significance.
                // * Mention industrial applications.
                // * Mention current usage.
                // * Mention interview perspective.
                // * Mention university exam keywords.

                // STRICTLY AVOID:

                // * Markdown
                // * ###
                // * **
                // * __
                // * ```blocks
                // ```
                // * JSON
                // * HTML
                // * XML
                // * YAML
                // * Code blocks
                // * AI disclaimers
                // * "Here is the answer"
                // * "Sure"
                // * "Certainly"

                // MINIMUM ANSWER SIZE RULE

                // Every answer must contain
                // at least 800-1200 words.

                // The answer must look like
                // a complete university answer
                // written for 10-15 marks.

                // Short answers are forbidden.

                // Do not provide summary style answers.

                // Provide sufficient detail to score full marks.

                // OUTPUT FORMAT:

                // Return ONLY the final answer content in plain text.

                // Do not return JSON.

                // Do not return markdown.

                // Do not return any explanation before the answer.

                // The answer must be directly printable into a PDF.

                // """
                // .formatted(university, subject, question);
                String prompt = """
                                You are a senior university professor and examiner.

                                University: %s

                                Subject: %s

                                Topic: %s

                                Generate a COMPLETE 10-15 marks university examination answer.

                                Requirements:

                                1. Definition

                                2. Detailed Explanation

                                3. Working / Architecture

                                4. Example

                                5. Diagram (if applicable)

                                6. Advantages

                                7. Disadvantages

                                8. Applications

                                9. Interview Perspective

                                10. University Exam Keywords

                                11. Conclusion

                                Rules:

                                - Use academic language.
                                - Use headings.
                                - Use numbering.
                                - Use bullet points.
                                - Use plain text only.
                                - No markdown.
                                - No JSON.
                                - No code blocks.
                                - Suitable for full marks.

                                Subject Awareness:

                                First identify the subject context.

                                Generate the answer according to the standard syllabus of the given subject.

                                Do not generate generic internet content.

                                Output only answer text.
                                """
                                .formatted(
                                                university,
                                                subject,
                                                question);
                return groqService.ask(prompt);
        }

        private byte[] createPdf(
                        String university,
                        String subject,
                        List<FrequencyDto> questions)
                        throws Exception {

                ByteArrayOutputStream out = new ByteArrayOutputStream();

                Document document = new Document();

                PdfWriter.getInstance(
                                document,
                                out);

                document.open();

                Font titleFont = FontFactory.getFont(
                                FontFactory.HELVETICA_BOLD,
                                20);

                Font questionFont = FontFactory.getFont(
                                FontFactory.HELVETICA_BOLD,
                                16);

                Font answerFont = FontFactory.getFont(
                                FontFactory.HELVETICA,
                                12);

                document.add(
                                new Paragraph(
                                                "REVIZOR ANSWER BOOK",
                                                titleFont));

                document.add(new Paragraph(" "));

                for (FrequencyDto q : questions) {

                        log.info("Generating answer for question: {}", q.getQuestion());

                        String answer = generateSingleAnswer(
                                        university,
                                        subject,
                                        q.getQuestion());

                        document.newPage();

                        document.add(
                                        new Paragraph(
                                                        "Question:",
                                                        questionFont));

                        document.add(
                                        new Paragraph(
                                                        q.getQuestion(),
                                                        answerFont));

                        document.add(
                                        new Paragraph(" "));

                        if (answer == null || answer.isBlank()) {

                                document.add(
                                                new Paragraph(
                                                                "Failed to generate answer"));

                                continue;
                        }

                        String[] lines = answer.split("\n");

                        for (String line : lines) {

                                if (line.trim().isEmpty()) {

                                        document.add(
                                                        new Paragraph(" "));

                                        continue;
                                }

                                document.add(
                                                new Paragraph(
                                                                line,
                                                                answerFont));
                        }

                        log.debug("Answer generated successfully");
                }

                document.close();

                log.info("PDF generated successfully");

                return out.toByteArray();
        }

        public byte[] generateAnswers(
                        String university,
                        String subject,
                        String frequencyJson)
                        throws Exception {

               

                ObjectMapper objectMapper = new ObjectMapper();

                System.out.println("TYPE CHECK");
                System.out.println(frequencyJson);

                while (frequencyJson.startsWith("\"")) {

                        frequencyJson = objectMapper.readValue(
                                        frequencyJson,
                                        String.class);
                }

                List<FrequencyDto> questions = objectMapper.readValue(
                                frequencyJson,
                                new TypeReference<List<FrequencyDto>>() {
                                });

                System.out.println("========== QUESTIONS ==========");

                questions.forEach(q -> System.out.println(q.getQuestion()));

                if (questions.isEmpty()) {

                        log.warn("No question found");

                        throw new FileProcessingException(
                                        "No questions found");
                }

                questions = questions.stream()
                                .filter(q -> "HIGH".equalsIgnoreCase(
                                                q.getImportance()))
                                .limit(10)
                                .toList();

                try {

                        return createPdf(
                                        university,
                                        subject,
                                        questions);

                } catch (Exception e) {

                        e.printStackTrace();

                        throw e;
                }
        }
}