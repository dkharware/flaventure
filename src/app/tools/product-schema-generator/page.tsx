
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductSchemaGenerator } from '@/components/tools/ProductSchemaGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Free Product Schema Generator (JSON-LD) | Flaventure Tools',
    description: 'Easily create JSON-LD schema markup for your products. Enhance your search engine listings with rich snippets, including price, availability, and ratings.',
    keywords: ['product schema', 'JSON-LD generator', 'structured data', 'e-commerce SEO', 'rich snippets', 'Google search results'],
};

export default function ProductSchemaGeneratorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools' },
        { label: 'Product Schema Generator' },
    ];

  return (
    <>
      <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Product Schema Generator</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Generate JSON-LD schema markup for your products to get rich snippets and improve your e-commerce SEO.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-5xl mx-auto">
              <ProductSchemaGenerator />
          </div>

          <div className="prose dark:prose-invert max-w-4xl mx-auto mt-12">
              <Card className="mt-8 bg-background/50 backdrop-blur-lg">
                  <CardHeader>
                      <CardTitle>Why Product Schema is Essential for E-commerce</CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                      <p><strong>Product schema</strong> is a form of structured data that you add to your product pages to help search engines like Google understand detailed information about what you're selling.</p>
                      <p>When you provide this data, Google can display your product with "rich snippets" in search results. These are the enhanced listings that include details like:</p>
                      <ul>
                          <li>Price and currency</li>
                          <li>Availability (In Stock / Out of Stock)</li>
                          <li>Star ratings and review counts</li>
                          <li>Brand information</li>
                      </ul>
                      <h3>The Benefits of Using Product Schema</h3>
                      <ol>
                          <li><strong>Stand Out in Search:</strong> Rich snippets are more visually appealing and provide key information at a glance, making your products stand out from the competition.</li>
                          <li><strong>Higher Click-Through Rate (CTR):</strong> By showing the price and rating directly in the search results, you attract more qualified buyers who are ready to make a purchase.</li>
                          <li><strong>Eligibility for Google Shopping:</strong> Proper structured data is a requirement for products to be eligible for inclusion in the Google Shopping tab.</li>
                      </ol>
                      <p>Use this tool to easily generate the required JSON-LD code. Simply fill in your product details, and then copy the generated script into your website's HTML, usually in your product template file.</p>
                  </CardContent>
              </Card>
          </div>
      </div>
    </>
  );
}
