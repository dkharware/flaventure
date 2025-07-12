import { TemplateCard } from '@/components/TemplateCard';
import { TemplateFilters } from '@/components/TemplateFilters';
import type { Template } from '@/lib/types';

const templates: Template[] = [
  { id: 'professional', name: 'Professional', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume simple' },
  { id: 'modern', name: 'Modern', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume clean' },
  { id: 'creative', name: 'Creative', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume color' },
  { id: 'minimalist', name: 'Minimalist', category: 'Simple', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume minimalist' },
  { id: 'bold', name: 'Bold', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume bold' },
  { id: 'classic', name: 'Classic', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume classic' },
  { id: 'tech', name: 'Tech', category: 'Modern', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume tech' },
  { id: 'simple', name: 'Simple', category: 'Simple', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume basic' },
];

export default function TemplatesPage() {
  const categories = ['All', ...new Set(templates.map(t => t.category))];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Choose Your Template</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Select a professionally designed template to start building your standout resume.</p>
      </div>
      
      <TemplateFilters templates={templates} categories={categories} />
      
    </div>
  );
}
