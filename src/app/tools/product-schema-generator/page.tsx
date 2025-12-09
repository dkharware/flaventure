
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductSchemaGenerator } from '@/components/tools/ProductSchemaGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Free Shopify Product Schema Generator (JSON-LD) | Rich Snippets Tool',
    description: 'Easily create JSON-LD schema markup for your Shopify products. Enhance your search engine listings with rich snippets, including price, availability, and reviews to improve CTR.',
    keywords: ['Shopify product schema', 'JSON-LD generator', 'structured data', 'Shopify SEO', 'rich snippets', 'Google search results'],
};

export default function ProductSchemaGeneratorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools/meta-tag-generator' },
        { label: 'Product Schema Generator' },
    ];

  return (
    <>
      <div className="w-full bg-muted/20 py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Product Schema Generator</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Generate JSON-LD schema markup for your Shopify products to get rich snippets and improve your SEO.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-5xl mx-auto">
              <ProductSchemaGenerator />
          </div>

          <div className="prose dark:prose-invert max-w-4xl mx-auto mt-12">
              <Card className="mt-8">
                  <CardHeader>
                      <CardTitle>What is Product Schema and Why Does it Matter for SEO?</CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                      <p><strong>Schema markup</strong> (specifically in JSON-LD format) is a standardized vocabulary of code that you add to your website to help search engines like Google understand your content more effectively. For an e-commerce store, <strong>Product Schema</strong> is crucial.</p>
                      <p>When you provide this structured data, Google can display your products as "rich snippets" in the search results. These are the eye-catching listings that include extra information like:</p>
                      <ul>
                          <li>Product price</li>
                          <li>Availability (In Stock / Out of Stock)</li>
                          <li>Star ratings and review counts</li>
                          <li>Brand information</li>
                      </ul>
                      <h3>The Benefits of Using Product Schema</h3>
                      <ol>
                          <li><strong>Increased Visibility:</strong> Rich snippets take up more space and are visually more appealing, making your products stand out from the competition.</li>
                          <li><strong>Higher Click-Through Rate (CTR):</strong> By providing key information directly in the search results, you attract more qualified buyers who are more likely to make a purchase.</li>
                          <li><strong>Improved SEO:</strong> While not a direct ranking factor, the higher CTR and better user experience signals to Google that your page is a relevant and valuable result, which can indirectly boost your rankings over time.</li>
                          <li><strong>Voice Search Optimization:</strong> Virtual assistants like Google Assistant use structured data to provide direct answers for product queries.</li>
                      </ol>
                      <p>Using this tool, you can easily generate the required JSON-LD code. Simply fill in your product details, and then copy the generated script into your Shopify theme's product template.</p>
                  </CardContent>
              </Card>
          </div>
      </div>
    </>
  );
}
