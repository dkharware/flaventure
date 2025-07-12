'use server';

/**
 * @fileOverview An AI agent that suggests relevant skills, descriptions, and hobbies for a resume based on user input and selected template.
 *
 * - suggestResumeContent - A function that generates resume content suggestions.
 * - SuggestResumeContentInput - The input type for the suggestResumeContent function.
 * - SuggestResumeContentOutput - The return type for the suggestResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResumeContentInputSchema = z.object({
  userInput: z
    .string()
    .describe("User-provided information about their work experience, education, and skills."),
  selectedTemplate: z
    .string()
    .describe("The name or identifier of the resume template selected by the user."),
});

export type SuggestResumeContentInput = z.infer<typeof SuggestResumeContentInputSchema>;

const SuggestResumeContentOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe("A list of skills relevant to the user's input and selected template."),
  suggestedDescriptions: z
    .array(z.string())
    .describe("A list of descriptions relevant to the user's input and selected template."),
  suggestedHobbies: z
    .array(z.string())
    .describe("A list of hobbies relevant to the user's input and selected template."),
});

export type SuggestResumeContentOutput = z.infer<typeof SuggestResumeContentOutputSchema>;

export async function suggestResumeContent(input: SuggestResumeContentInput): Promise<SuggestResumeContentOutput> {
  return suggestResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResumeContentPrompt',
  input: {schema: SuggestResumeContentInputSchema},
  output: {schema: SuggestResumeContentOutputSchema},
  prompt: `Based on the user input: {{{userInput}}}, and the selected resume template: {{{selectedTemplate}}}, suggest relevant skills, descriptions, and hobbies that the user can include in their resume.\n\nSkills: A list of skills relevant to the user's input and selected template.\nDescriptions: A list of descriptions relevant to the user's input and selected template.\nHobbies: A list of hobbies relevant to the user's input and selected template.\n\nFormat your repsonse as a valid JSON object with 'suggestedSkills', 'suggestedDescriptions', and 'suggestedHobbies' keys. Each key should map to a list of strings. Do not include any additional text outside of the JSON object. Be as concise as possible, and avoid using any extra words beyond those which are strictly needed to incorporate the above-requested content. In particular, do not include any introductory or concluding remarks, and do not thank the user, etc.`,
});

const suggestResumeContentFlow = ai.defineFlow(
  {
    name: 'suggestResumeContentFlow',
    inputSchema: SuggestResumeContentInputSchema,
    outputSchema: SuggestResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
