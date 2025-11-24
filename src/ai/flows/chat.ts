
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
    
    // If the query is a multi-word phrase, search for the exact phrase.
    // Otherwise, use wildcards for a broader search.
    const shopifyQuery = query.includes(' ') 
      ? `title:"${query}" OR body:"${query}"`
      : `title:*${query}* OR body:*${query}*`;

    const articles = await getArticles(3, shopifyQuery);
    return articles.map((a: any) => ({ title: a.title, handle: a.handle }));
  }
);


const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (promptContent) => {
    const llmResponse = await ai.generate({
      prompt: `You are a blog search assistant. Your ONLY job is to search for relevant blog articles using the provided tool based on the user's input. Do not answer questions directly or engage in conversation.

      User's request: "${promptContent}"

      - Immediately call the \`searchBlogArticles\` tool with a query derived from the user's request.
      - Do not add any conversational text, greetings, or explanations.
      - If the tool returns articles, respond ONLY with the list of markdown links.
      - If the tool returns no articles, respond ONLY with the exact phrase "No relevant articles found for that topic."`,
      tools: [searchBlogArticles],
    });
    
    // Check for a tool request and process it.
    if (llmResponse.toolRequest) {
      const toolResponse = await llmResponse.toolRequest.callback();
      const articles = toolResponse[0].output as { title: string; handle: string }[] | undefined;

      if (articles && articles.length > 0) {
        return articles.map(article => `[${article.title}](/blog/${article.handle})`).join('\n');
      } else {
        return "No relevant articles found for that topic.";
      }
    }
    
    // Fallback if the model doesn't use the tool (e.g., for "hi")
    // or if the tool call fails in an unexpected way.
    if (llmResponse.text) {
        return llmResponse.text;
    }

    return "No relevant articles found for that topic.";
  }
);
