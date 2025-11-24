import { z } from 'zod';

export const ResumeAnalysisOutputSchema = z.object({
  atsScore: z.number().min(0).max(100).describe("An estimated ATS-friendliness score out of 100. This should reflect the resume's formatting, structure, and use of standard sections."),
  keywordMatchScore: z.number().min(0).max(100).describe("A score out of 100 representing how well the skills and experience in the resume match the provided job description."),
  grammarCheck: z.object({
    passed: z.boolean().describe("Whether the resume passes a basic grammar and spelling check."),
    feedback: z.string().describe("Concise feedback on any grammatical errors or typos found. If none, state that it looks good."),
  }),
  formattingCheck: z.object({
    passed: z.boolean().describe("Whether the resume's formatting is clean, professional, and easy to read."),
    feedback: z.string().describe("Feedback on the formatting, such as consistency, spacing, and readability. If it's good, state that."),
  }),
  suggestions: z.array(z.string()).describe("A list of 3-5 actionable suggestions for improving the resume, focusing on content, impact, and alignment with the job description."),
});

export type ResumeAnalysisOutput = z.infer<typeof ResumeAnalysisOutputSchema>;
