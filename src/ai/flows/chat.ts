
'use server';

/**
 * @fileOverview An AI agent that provides helpful chat responses for the easyfreecv website.
 * It can also search for and suggest relevant blog articles.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getArticles } from '@/lib/shopify';

const ChatInputSchema = z.string().describe("User's question for the chat assistant.");

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string().describe("AI assistant's response.");

export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}


const searchBlogArticles = ai.defineTool(
  {
    name: 'searchBlogArticles',
    description: 'Searches for relevant blog articles based on a user query. Use this tool whenever a user asks for information, advice, or "how-to" instructions on any topic that might be covered in a blog post.',
    inputSchema: z.object({ query: z.string().describe('A search query optimized for finding relevant blog posts, derived from the user\'s question.') }),
    outputSchema: z.array(z.object({
      title: z.string(),
      handle: z.string(),
    })),
  },
  async ({ query }) => {
    console.log(`Searching articles with query: ${query}`);
    const articles = await getArticles(3, `title:*${query}* OR body:*${query}*`);
    return articles.map((a: any) => ({ title: a.title, handle: a.handle }));
  }
);


const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
    tools: [searchBlogArticles],
  },
  async (promptContent) => {
    const llmResponse = await ai.generate({
      prompt: `You are a blog search assistant for a website called easyfreecv.

      **CRITICAL INSTRUCTIONS:**
      1.  Your **ONLY** job is to use the 'searchBlogArticles' tool based on the user's question.
      2.  If the tool finds articles, you **MUST** respond with ONLY a list of the articles in markdown link format (e.g., "[Article Title](/blog/article-handle)"). Do not add any other text, explanation, or conversation.
      3.  If the tool returns no articles, you **MUST** respond with only this exact phrase: "I could not find any relevant articles for that topic."
      4.  For simple greetings like "hi" or "hello", you can respond with a simple "Hello! How can I help you find an article?".
      
      User's question: "${promptContent}"
      `,
    });

    return llmResponse.text;
  }
);
