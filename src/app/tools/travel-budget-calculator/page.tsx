
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TravelBudgetCalculator } from '@/components/tools/TravelBudgetCalculator';

export const metadata: Metadata = {
    title: 'Free Travel Budget Calculator | Flaventure Tools',
    description: 'Plan your next trip with our free travel budget calculator. Estimate costs for flights, accommodation, food, and activities to create a detailed budget for your adventure.',
    keywords: ['travel budget calculator', 'trip cost estimator', 'vacation budget planner', 'travel tools'],
};

export default function TravelBudgetCalculatorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Travel Budget Calculator' },
    ];

  return (
    <>
      <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Travel Budget Calculator</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Plan your adventure with confidence. Use our tool to estimate your total trip cost.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-4xl mx-auto">
              <TravelBudgetCalculator />
          </div>
      </div>
    </>
  );
}
