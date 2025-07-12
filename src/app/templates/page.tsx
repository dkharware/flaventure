
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateFilters } from '@/components/TemplateFilters';
import type { Template } from '@/lib/types';

const templates: Template[] = [
  { id: 'professional', name: 'Professional', category: 'Corporate', imageUrl: '/images/templates/professional.png', hint: 'resume simple', color: 'blue' },
  { id: 'modern', name: 'Modern', category: 'Corporate', imageUrl: '/images/templates/modern.png', hint: 'resume clean', color: 'black' },
  { id: 'creative', name: 'Creative', category: 'Creative', imageUrl: '/images/templates/creative.png', hint: 'resume color', isPremium: true, price: 50, color: 'orange' },
  { id: 'minimalist', name: 'Minimalist', category: 'Simple', imageUrl: '/images/templates/minimalist.png', hint: 'resume minimalist', color: 'black' },
  { id: 'bold', name: 'Bold', category: 'Creative', imageUrl: '/images/templates/bold.png', hint: 'resume bold', isPremium: true, price: 50, color: 'red' },
  { id: 'classic', name: 'Classic', category: 'Corporate', imageUrl: '/images/templates/classic.png', hint: 'resume classic', color: 'blue' },
  { id: 'tech', name: 'Tech', category: 'Modern', imageUrl: '/images/templates/developer.png', hint: 'resume tech', isPremium: true, price: 50, color: 'green' },
  { id: 'simple', name: 'Simple', category: 'Simple', imageUrl: '/images/templates/compact.png', hint: 'resume basic', color: 'black' },
  { id: 'academic', name: 'Academic', category: 'Academic', imageUrl: '/images/templates/academic.png', hint: 'resume academic', color: 'blue' },
  { id: 'infographic', name: 'Infographic', category: 'Creative', imageUrl: '/images/templates/infographic.png', hint: 'resume visual', isPremium: true, price: 50, color: 'purple' },
  { id: 'entry-level', name: 'Entry-Level', category: 'Entry-Level', imageUrl: '/images/templates/entry-level.png', hint: 'resume beginner', color: 'blue' },
  { id: 'executive', name: 'Executive', category: 'Corporate', imageUrl: '/images/templates/executive.png', hint: 'resume executive', isPremium: true, price: 50, color: 'black' },
  { id: 'developer', name: 'Developer', category: 'Technical', imageUrl: '/images/templates/developer.png', hint: 'resume developer', color: 'green' },
  { id: 'sales', name: 'Sales', category: 'Corporate', imageUrl: '/images/templates/sales.png', hint: 'resume sales', color: 'red' },
  { id: 'portfolio', name: 'Portfolio', category: 'Creative', imageUrl: '/images/templates/portfolio.png', hint: 'resume portfolio', color: 'purple' },
  { id: 'two-column', name: 'Two Column', category: 'Modern', imageUrl: '/images/templates/two-column.png', hint: 'resume two column', color: 'blue' },
  { id: 'timeline', name: 'Timeline', category: 'Creative', imageUrl: '/images/templates/timeline.png', hint: 'resume timeline', isPremium: true, price: 50, color: 'orange' },
  { id: 'compact', name: 'Compact', category: 'Simple', imageUrl: '/images/templates/compact.png', hint: 'resume compact', color: 'black' },
];

export default function TemplatesPage() {
  const categories = ['All', ...new Set(templates.map(t => t.category))];
  const colors = ['All', ...new Set(templates.map(t => t.color).filter(Boolean) as string[])];

  return (
    <div className="container mx-auto py-12 px-6 md:px-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Choose Your Template</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Select a professionally designed template to start building your standout resume.</p>
      </div>
      
      <TemplateFilters templates={templates} categories={categories} colors={colors} />
      
    </div>
  );
}
