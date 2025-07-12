import { TemplateCard } from '@/components/TemplateCard';
import { TemplateFilters } from '@/components/TemplateFilters';
import type { Template } from '@/lib/types';

const templates: Template[] = [
  { id: 'professional', name: 'Professional', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume simple' },
  { id: 'modern', name: 'Modern', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume clean' },
  { id: 'creative', name: 'Creative', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume color', isPremium: true, price: 50 },
  { id: 'minimalist', name: 'Minimalist', category: 'Simple', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume minimalist' },
  { id: 'bold', name: 'Bold', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume bold', isPremium: true, price: 50 },
  { id: 'classic', name: 'Classic', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume classic' },
  { id: 'tech', name: 'Tech', category: 'Modern', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume tech', isPremium: true, price: 50 },
  { id: 'simple', name: 'Simple', category: 'Simple', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume basic' },
  { id: 'academic', name: 'Academic', category: 'Academic', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume academic' },
  { id: 'infographic', name: 'Infographic', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume visual', isPremium: true, price: 50 },
  { id: 'entry-level', name: 'Entry-Level', category: 'Entry-Level', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume beginner' },
  { id: 'executive', name: 'Executive', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume executive', isPremium: true, price: 50 },
  { id: 'developer', name: 'Developer', category: 'Technical', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume developer' },
  { id: 'sales', name: 'Sales', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume sales' },
  { id: 'portfolio', name: 'Portfolio', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume portfolio' },
  { id: 'two-column', name: 'Two Column', category: 'Modern', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume two column' },
  { id: 'timeline', name: 'Timeline', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume timeline', isPremium: true, price: 50 },
  { id: 'compact', name: 'Compact', category: 'Simple', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume compact' },
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
