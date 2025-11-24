
'use server';

/**
 * @fileOverview An AI agent that provides helpful chat responses for the easyfreecv website.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.string().describe("User's question for the chat assistant.");

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string().describe("AI assistant's response.");

export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  prompt: `You are a friendly and helpful AI assistant for a website called easyfreecv, a free resume and CV builder. Your goal is to answer user questions about resume building, job searching, using the website, and related topics.

    Keep your answers concise and helpful. If you don't know an answer, say that you are an AI assistant with limited knowledge and can't answer that. Do not make up information.

    User's question: {{{prompt}}}
  `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (promptContent) => {
    const { output } = await prompt(promptContent);
    return output!;
  }
);
