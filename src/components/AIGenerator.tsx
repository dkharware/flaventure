'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { getSuggestions } from '@/app/actions/ai';
import { useResume } from './Editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Plus } from 'lucide-react';

interface AIGeneratorProps {
  fieldName: 'summary' | 'skills' | 'hobbies';
  onSuggestionSelect: (suggestion: string) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Generating...' : <><Lightbulb className="mr-2 h-4 w-4" /> Get Suggestions</>}
    </Button>
  );
}

export function AIGenerator({ fieldName, onSuggestionSelect }: AIGeneratorProps) {
  const [state, formAction] = useActionState(getSuggestions, null);
  const { templateId, resumeData } = useResume();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);
  
  const handleFormAction = (formData: FormData) => {
    const userInput = formData.get('userInput') as string;
    if (!userInput) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please provide some input for suggestions.',
      });
      return;
    }
    formAction(formData);
  }

  const getSuggestionsForField = () => {
    if (!state?.suggestions) return [];
    if (fieldName === 'summary') return state.suggestions.suggestedDescriptions;
    if (fieldName === 'skills') return state.suggestions.suggestedSkills;
    if (fieldName === 'hobbies') return state.suggestions.suggestedHobbies;
    return [];
  }
  
  const suggestions = getSuggestionsForField();

  return (
    <Card className="bg-accent/10 border-accent/30 mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-headline flex items-center gap-2"><Lightbulb className="text-accent" /> AI Helper</CardTitle>
        <CardDescription>Get content ideas based on your resume.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleFormAction} className="space-y-2">
          <input type="hidden" name="selectedTemplate" value={templateId} />
          <Textarea 
            ref={textAreaRef}
            name="userInput" 
            placeholder="e.g., Senior Product Manager"
            className="text-sm"
            defaultValue={resumeData.personalInfo.title}
          />
          <SubmitButton />
        </form>
        {suggestions.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">Suggestions:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent/20"
                  onClick={() => onSuggestionSelect(item)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
