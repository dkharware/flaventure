
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShopifyApiGuideContent } from '@/components/ShopifyApiGuideContent';

export const metadata: Metadata = {
    title: 'Shopify Storefront & Admin API Tutorial',
    description: 'A comprehensive guide to using the Shopify Storefront and Admin APIs. Learn the differences, use cases, and see code examples for building custom apps and storefronts.',
    keywords: ['Shopify API', 'Storefront API', 'Admin API', 'Shopify tutorial', 'Shopify development', 'GraphQL', 'REST'],
};

export default function ShopifyApiGuidePage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Shopify API Guide' },
    ];

  return (
    <>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-7xl mx-auto">
              <Breadcrumbs items={breadcrumbItems} className="mb-8" />
              <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-headline font-bold">Shopify API Guide</h1>
                  <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                      Your quick reference for Shopify's core APIs. Click on any item to see a description and code example.
                  </p>
              </div>
              <ShopifyApiGuideContent />
          </div>
      </div>
    </>
  );
}

