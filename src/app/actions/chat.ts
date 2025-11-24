
'use server';

import { chat } from '@/ai/flows/chat';

type ChatState = {
  reply?: string;
  error?: string;
};

export async function getChatResponse(message: string): Promise<ChatState> {
  if (!message) {
    return { error: 'Message cannot be empty.' };
  }

  try {
    const reply = await chat(message);
    return { reply };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get a response from the assistant. Please try again later.' };
  }
}
