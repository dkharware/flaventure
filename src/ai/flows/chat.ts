
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
    description: 'Searches for relevant blog articles based on a user query. Use this if the user is asking for tips, advice, or how to do something related to resumes, CVs, job searching, or careers.',
    inputSchema: z.object({ query: z.string().describe('A search query optimized for finding relevant blog posts.') }),
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
      prompt: `You are a friendly and helpful AI assistant for a website called easyfreecv, a free resume and CV builder. Your goal is to answer user questions about resume building, job searching, using the website, and related topics.

      - If the user asks for advice, tips, or "how to" information, use the 'searchBlogArticles' tool to find relevant articles.
      - If you find articles, list them in your response with links in markdown format (e.g., "[Article Title](/blog/article-handle)").
      - If no relevant articles are found, simply answer the user's question directly and inform them that you couldn't find any specific blog posts on that topic.
      - For all other questions, provide a concise and helpful answer.
      - If you don't know an answer, say that you are an AI assistant with limited knowledge and can't answer that. Do not make up information.
      
      User's question: ${promptContent}
      `,
    });

    return llmResponse.text;
  }
);
