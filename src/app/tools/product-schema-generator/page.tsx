
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductSchemaGenerator } from '@/components/tools/ProductSchemaGenerator';

export const metadata: Metadata = {
    title: 'Shopify Product Schema Generator | Tools',
    description: 'Easily create JSON-LD schema markup for your Shopify products to enhance your search engine listings with rich snippets, prices, and reviews.',
    keywords: ['Shopify product schema', 'JSON-LD generator', 'structured data', 'Shopify SEO', 'rich snippets'],
};

export default function ProductSchemaGeneratorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools/meta-tag-generator' },
        { label: 'Product Schema Generator' },
    ];

  return (
    <>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-5xl mx-auto">
              <Breadcrumbs items={breadcrumbItems} className="mb-8" />
              <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-headline font-bold">Product Schema Generator</h1>
                  <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                      Generate JSON-LD schema markup for your Shopify products to improve SEO.
                  </p>
              </div>
              <ProductSchemaGenerator />
          </div>
      </div>
    </>
  );
}
