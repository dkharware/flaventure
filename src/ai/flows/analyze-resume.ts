'use server';

/**
 * @fileOverview An AI agent that analyzes a resume for ATS compatibility, keyword matching, and provides suggestions.
 *
 * - analyzeResume - A function that performs the resume analysis.
 * - ResumeAnalysisInput - The input type for the analyzeResume function.
 * - ResumeAnalysisOutput - The return type for the analyzeResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { ResumeData } from '@/lib/types';


// We define a Zod schema for the input, mirroring the ResumeData type.
// This ensures type safety and provides structure for the AI prompt.
const ResumeDataSchema = z.object({
    personalInfo: z.object({
        name: z.string(),
        title: z.string(),
        phone: z.string(),
        email: z.string(),
        location: z.string(),
        linkedin: z.string(),
        website: z.string(),
    }),
    summary: z.string().optional(),
    objective: z.string().optional(),
    experience: z.array(z.object({
        id: z.string(),
        title: z.string(),
        company: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
    })),
    education: z.array(z.object({
        id: z.string(),
        school: z.string(),
        degree: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string(),
    })),
    skills: z.array(z.object({ id: z.string(), name: z.string() })),
    hobbies: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
});


const ResumeAnalysisInputSchema = z.object({
  resumeData: ResumeDataSchema,
  jobDescription: z.string().describe("The job description the user is targeting."),
});

export type ResumeAnalysisInput = z.infer<typeof ResumeAnalysisInputSchema>;

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


export async function analyzeResume(input: ResumeAnalysisInput): Promise<ResumeAnalysisOutput> {
  return analyzeResumeFlow(input);
}


const prompt = ai.definePrompt({
    name: 'analyzeResumePrompt',
    input: { schema: ResumeAnalysisInputSchema },
    output: { schema: ResumeAnalysisOutputSchema },
    prompt: `You are an expert career coach and resume analyst. Analyze the provided resume data in the context of the target job description. Provide a detailed analysis based on the required output schema.

    **Resume Data:**
    \`\`\`json
    {{{json resumeData}}}
    \`\`\`

    **Target Job Description:**
    "{{{jobDescription}}}"

    **Analysis Instructions:**
    1.  **ATS Score**: Evaluate the resume's structure for Applicant Tracking System (ATS) compatibility. A standard, clean format gets a higher score. Complex tables, columns, or graphics lower the score. Score out of 100.
    2.  **Keyword Match Score**: Compare the skills, experience, and summary in the resume against the keywords and requirements in the job description. A higher score means better alignment. Score out of 100.
    3.  **Grammar Check**: Proofread the entire resume for spelling mistakes, grammatical errors, and typos. Provide specific feedback or confirm it's well-written.
    4.  **Formatting Check**: Assess the overall readability, consistency, and professionalism of the resume's layout.
    5.  **Suggestions for Improvement**: Provide a list of concrete, actionable suggestions. These should help the user better tailor their resume to the job description, quantify their achievements, and improve overall impact.
    
    Your response must be a valid JSON object that conforms to the specified output schema.`,
});


const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: ResumeAnalysisInputSchema,
    outputSchema: ResumeAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
