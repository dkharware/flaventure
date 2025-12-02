
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LiquidToJsonConverter } from '@/components/tools/LiquidToJsonConverter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Free Shopify Liquid to JSON Converter | Online Tool for Developers',
    description: 'A free online tool to convert Shopify Liquid objects and code snippets into clean, valid JSON format. Instantly debug Liquid data or prepare it for headless storefronts.',
    keywords: ['Shopify Liquid to JSON', 'Liquid converter', 'Shopify development tools', 'JSON converter', 'Liquid debug', 'Shopify API', 'headless commerce'],
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
                      Instantly convert Shopify Liquid objects into clean, readable JSON format for easier debugging and data handling in headless builds.
                  </p>
              </div>
              <LiquidToJsonConverter />

              <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Why Use a Liquid to JSON Converter?</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>In Shopify theme development, it's a common task to inspect the data available in Liquid objects like <code>product</code>, <code>collection</code>, or <code>cart</code>. The standard way to do this is to serialize the object into JSON using the <code>| json</code> filter and print it inside a <code>&lt;script&gt;</code> tag.</p>
                            <p>This tool simplifies the process by extracting and formatting that JSON output for you. It's incredibly useful for:</p>
                            <ul>
                                <li><strong>Debugging:</strong> Quickly see the exact structure and data of any Liquid object without having to dig through your browser's dev tools.</li>
                                <li><strong>Headless Development:</strong> When building a headless Shopify site, you often need to know what data you can expect from the Storefront API. You can use this tool to grab the JSON representation of a product from a standard theme to model your data structures.</li>
                                <li><strong>Learning:</strong> Understand the properties and values available within Shopify's Liquid objects by exploring them in a clean, hierarchical format.</li>
                            </ul>
                            <h3>How to Use the Converter</h3>
                            <p>
                                1. In your Shopify theme's Liquid file (e.g., `product.liquid`), add the following code to output the object you want to inspect:
                            </p>
                            <pre><code>
{`{{ product | json }}`}
                            </code></pre>
                            <p>
                                2. View the page in your browser and copy the entire output. It might look messy.
                            </p>
                            <p>
                                3. Paste the copied code into the "Liquid Input" field above and click "Convert to JSON". The tool will automatically extract and beautify the JSON for you.
                            </p>
                        </CardContent>
                    </Card>
              </div>
          </div>
      </div>
    </>
  );
}
