
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LiquidToJsonConverter } from '@/components/tools/LiquidToJsonConverter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export const metadata: Metadata = {
    title: 'Free Liquid to JSON Converter | Flaventure Tools',
    description: 'A developer tool to easily extract and format a JSON object from a Shopify Liquid snippet or file.',
    keywords: ['liquid to json', 'shopify developer tool', 'liquid json', 'shopify tools'],
};

export default function LiquidToJsonConverterPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Liquid to JSON Converter' },
    ];

  return (
    <>
      <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Liquid to JSON Converter</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    A simple developer utility to extract and prettify JSON from Liquid code.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-4xl mx-auto">
              <LiquidToJsonConverter />

              <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
                    <Card className="mt-8 bg-background/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>How to Use This Tool</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>This tool is designed for Shopify developers who need to inspect the JSON output of a Liquid object. A common use case is debugging the JSON passed to a JavaScript framework like Alpine.js or Vue.js.</p>
                            
                            <h3>Instructions:</h3>
                            <ol>
                                <li>In your Liquid file (e.g., a product template), find the code that outputs your JSON. This is often a script tag that looks something like this:
                                    <pre><code>
{`{%- assign product_json = product | json -%}
<script type="application/json" id="ProductJson-{{ section.id }}">
    {{ product_json }}
</script>`}
                                    </code></pre>
                                </li>
                                <li>From your browser's "View Page Source," copy the entire rendered output, including the script tags and the JSON inside.</li>
                                <li>Paste the copied code into the "Liquid Output or Snippet" text box.</li>
                                <li>Click "Convert to JSON". The tool will automatically find and format the JSON for you.</li>
                            </ol>
                        </CardContent>
                    </Card>
              </div>
          </div>
      </div>
    </>
  );
}
