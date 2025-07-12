import { TemplateCard } from '@/components/TemplateCard';

const templates = [
  { id: 'professional', name: 'Professional', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume simple' },
  { id: 'creative', name: 'Creative', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume color' },
  { id: 'modern', name: 'Modern', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume clean' },
  { id: 'minimalist', name: 'Minimalist', imageUrl: 'https://placehold.co/400x565.png', hint: 'resume minimalist' },
];

export default function TemplatesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Choose Your Template</h1>
        <p className="text-lg text-muted-foreground mt-2">Select a template to start building your professional resume.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {templates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </div>
    </div>
  );
}
