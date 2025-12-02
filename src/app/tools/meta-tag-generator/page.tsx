
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MetaTagGenerator } from '@/components/tools/MetaTagGenerator';

export const metadata: Metadata = {
    title: 'Shopify Meta Tag Generator | Tools',
    description: 'Generate SEO-friendly meta tags (title, description, Open Graph, Twitter cards) for your Shopify products, pages, and articles to improve search visibility.',
    keywords: ['Shopify meta tags', 'meta tag generator', 'Shopify SEO', 'Open Graph generator', 'Twitter card generator'],
};

export default function MetaTagGeneratorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools' },
        { label: 'Meta Tag Generator' },
    ];

  return (
    <>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-4xl mx-auto">
              <Breadcrumbs items={breadcrumbItems} className="mb-8" />
              <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-headline font-bold">Shopify Meta Tag Generator</h1>
                  <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                      Create SEO-friendly meta tags for your Shopify store content.
                  </p>
              </div>
              <MetaTagGenerator />
          </div>
      </div>
    </>
  );
}
