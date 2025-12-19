
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PackingChecklistGenerator } from '@/components/tools/PackingChecklistGenerator';

export const metadata: Metadata = {
    title: 'Free Packing Checklist Generator | Flaventure Tools',
    description: 'Create a customized packing list for your next trip. Select your destination type, activities, and trip length to generate a personalized travel checklist.',
    keywords: ['packing checklist', 'travel checklist', 'packing list generator', 'travel packing tool'],
};

export default function PackingChecklistPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Packing Checklist Generator' },
    ];

  return (
    <>
      <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Packing Checklist Generator</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Never forget an essential item again. Create your personalized packing list in seconds.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-4xl mx-auto">
              <PackingChecklistGenerator />
          </div>
      </div>
    </>
  );
}
