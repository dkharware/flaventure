
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
    description: 'Searches for relevant blog articles based on a user query. Use this tool for any user input.',
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
      prompt: `${promptContent}`,
      tools: [searchBlogArticles],
    });

    const toolResponse = llmResponse.toolRequest?.toolResponse;

    if (toolResponse && toolResponse.length > 0 && toolResponse[0].output) {
      const articles = toolResponse[0].output as { title: string; handle: string }[];
      if (articles.length > 0) {
        return articles.map(article => `[${article.title}](/blog/${article.handle})`).join('\n');
      }
    }

    return "No relevant articles found for that topic.";
  }
);
