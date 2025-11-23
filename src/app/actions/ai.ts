'use server';

import { suggestResumeContent } from '@/ai/flows/suggest-resume-content';
import { analyzeResume, type ResumeAnalysisOutput } from '@/ai/flows/analyze-resume';
import type { ResumeData } from '@/lib/types';

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


type AnalysisState = {
  analysis?: ResumeAnalysisOutput;
  error?: string;
} | null;

export async function getResumeAnalysis(
  resumeData: ResumeData, 
  jobDescription: string
): Promise<AnalysisState> {
  if (!jobDescription) {
    return { error: 'Please provide a job description for analysis.' };
  }

  try {
    const analysis = await analyzeResume({ resumeData, jobDescription });
    return { analysis };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get AI analysis. Please try again.' };
  }
}
