'use server';

import { suggestResumeContent } from '@/ai/flows/suggest-resume-content';

type SuggestionState = {
  suggestions?: {
    suggestedSkills: string[];
    suggestedDescriptions: string[];
    suggestedHobbies: string[];
  };
  error?: string;
} | null;

export async function getSuggestions(prevState: SuggestionState, formData: FormData): Promise<SuggestionState> {
  const userInput = formData.get('userInput') as string;
  const selectedTemplate = formData.get('selectedTemplate') as string;

  if (!userInput) {
    return { error: 'Please provide some input for suggestions.' };
  }

  try {
    const suggestions = await suggestResumeContent({ userInput, selectedTemplate });
    return { suggestions };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get AI suggestions. Please try again.' };
  }
}
