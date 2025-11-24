
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
      prompt: `You are a friendly and helpful AI assistant for a website called easyfreecv. Your main goal is to assist users.

      **CRITICAL INSTRUCTION: Your primary function is to help users by finding relevant information from the site's blog.**
      
      - **ALWAYS** use the 'searchBlogArticles' tool when a user asks for information, advice, "how-to" instructions, or asks about any specific topic. It is your best resource.
      - If the tool finds articles, list them clearly using markdown links (e.g., "[Article Title](/blog/article-handle)").
      - If the tool returns no articles, then you can answer the question to the best of your ability, but you **must** state that you couldn't find any specific blog posts on that topic.
      - For simple greetings or chit-chat, you can respond directly without searching.
      
      User's question: "${promptContent}"
      `,
    });

    return llmResponse.text;
  }
);
