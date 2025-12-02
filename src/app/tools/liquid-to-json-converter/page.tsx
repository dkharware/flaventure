
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LiquidToJsonConverter } from '@/components/tools/LiquidToJsonConverter';

export const metadata: Metadata = {
    title: 'Liquid to JSON Converter | Shopify Tools',
    description: 'A free online tool to convert Shopify Liquid objects and code snippets into clean, valid JSON format. Useful for debugging and headless development.',
    keywords: ['Shopify Liquid to JSON', 'Liquid converter', 'Shopify development tools', 'JSON converter', 'Liquid debug'],
};

export default function LiquidToJsonConverterPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools/meta-tag-generator' },
        { label: 'Liquid to JSON Converter' },
    ];

  return (
    <>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-4xl mx-auto">
              <Breadcrumbs items={breadcrumbItems} className="mb-8" />
              <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-headline font-bold">Liquid to JSON Converter</h1>
                  <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                      Convert Shopify Liquid objects into JSON format for easier debugging and data handling.
                  </p>
              </div>
              <LiquidToJsonConverter />
          </div>
      </div>
    </>
  );
}
