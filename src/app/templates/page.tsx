import { TemplateFilters } from '@/components/TemplateFilters';
import type { Template } from '@/lib/types';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Free Resume & CV Templates | easyfreecv Resume Builder',
  description: 'Choose from a wide selection of professionally designed free resume templates and CV letter examples with our CV builder. Find the perfect design to create your resume.',
};

const templates: Template[] = [
  { id: 'professional', name: 'Professional', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume simple', color: 'blue' },
  { id: 'modern', name: 'Modern', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume clean', color: 'black' },
  { id: 'creative', name: 'Creative', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume color', isPremium: true, price: 50, color: 'orange' },
  { id: 'minimalist', name: 'Minimalist', category: 'Simple', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume minimalist', color: 'black' },
  { id: 'bold', name: 'Bold', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume bold', isPremium: true, price: 50, color: 'red' },
  { id: 'classic', name: 'Classic', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume classic', color: 'blue' },
  { id: 'tech', name: 'Tech', category: 'Modern', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume tech', isPremium: true, price: 50, color: 'green' },
  { id: 'simple', name: 'Simple', category: 'Simple', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume basic', color: 'black' },
  { id: 'academic', name: 'Academic', category: 'Academic', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume academic', color: 'blue' },
  { id: 'infographic', name: 'Infographic', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume visual', isPremium: true, price: 50, color: 'purple' },
  { id: 'entry-level', name: 'Entry-Level', category: 'Entry-Level', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume beginner', color: 'blue' },
  { id: 'executive', name: 'Executive', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume executive', isPremium: true, price: 50, color: 'black' },
  { id: 'developer', name: 'Developer', category: 'Technical', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume developer', color: 'green' },
  { id: 'sales', name: 'Sales', category: 'Corporate', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume sales', color: 'red' },
  { id: 'portfolio', name: 'Portfolio', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume portfolio', color: 'purple' },
  { id: 'two-column', name: 'Two Column', category: 'Modern', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume two column', color: 'blue' },
  { id: 'timeline', name: 'Timeline', category: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume timeline', isPremium: true, price: 50, color: 'orange' },
  { id: 'compact', name: 'Compact', category: 'Simple', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume compact', color: 'black' },
  { id: 'cover-letter-professional', name: 'Professional Cover Letter', category: 'Cover Letter', imageUrl: 'https://placehold.co/400x565.png', hint: 'cover letter simple', color: 'blue' },
  { id: 'cover-letter-modern', name: 'Modern Cover Letter', category: 'Cover Letter', imageUrl: 'https://placehold.co/400x565.png', hint: 'cover letter clean', color: 'black' },
  { id: 'cover-letter-creative', name: 'Creative Cover Letter', category: 'Cover Letter', imageUrl: 'https://placehold.co/400x565.png', hint: 'cover letter creative', isPremium: true, price: 25, color: 'orange' },
];

export default function TemplatesPage() {
  const categories = ['All', ...new Set(templates.map(t => t.category))];
  const colors = ['All', ...new Set(templates.map(t => t.color).filter(Boolean) as string[])];

  return (
    <div className="container mx-auto py-12 px-6 md:px-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Choose Your CV Template</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Select a professionally designed template to start building your standout CV or free resume. We also have CV letter examples.</p>
      </div>
      
      <Suspense fallback={<div>Loading filters...</div>}>
        <TemplateFilters templates={templates} categories={categories} colors={colors} />
      </Suspense>
      
    </div>
  );
}
