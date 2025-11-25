
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CheatsheetContent } from '@/components/CheatsheetContent';

export const metadata: Metadata = {
    title: 'The Ultimate Shopify Liquid Cheatsheet',
    description: 'Your complete quick reference guide for Shopify Liquid. Find syntax, objects, tags, and filters for Shopify theme development, including code examples for products, collections, cart, and more.',
    keywords: ['Shopify Liquid', 'Liquid cheatsheet', 'Shopify Liquid syntax', 'Shopify theme development', 'Liquid objects', 'Liquid tags', 'Liquid filters', 'Shopify theming', 'Liquid tutorial'],
};

export default function ShopifyLiquidCheatsheetPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Shopify Liquid Cheatsheet' },
    ];

  return (
    <>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-7xl mx-auto">
              <Breadcrumbs items={breadcrumbItems} className="mb-8" />
              <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-headline font-bold">Shopify Liquid Cheatsheet</h1>
                  <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                      Your quick reference guide for Shopify Liquid. Click on any item to see a description and code example.
                  </p>
              </div>
              <CheatsheetContent />
          </div>
      </div>
    </>
  );
}
