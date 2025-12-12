
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShopifyAiContentGenerator } from '@/components/tools/ShopifyAiContentGenerator';

export const metadata: Metadata = {
    title: 'Free Shopify AI Content Generator | Product Descriptions & Blog Posts',
    description: 'Use our free AI tool to generate high-quality product descriptions, blog post ideas, and marketing copy for your Shopify store. Boost your SEO and save time on content creation.',
    keywords: ['Shopify AI', 'AI content generator', 'product description generator', 'Shopify SEO tool', 'AI for e-commerce', 'blog idea generator'],
};

export default function AiContentGeneratorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools/meta-tag-generator' },
        { label: 'Shopify AI Content Generator' },
    ];

  return (
    <>
      <div className="w-full bg-muted/20 py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Shopify AI Content Generator</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Create compelling, SEO-friendly content for your Shopify store in seconds. Generate product descriptions, blog ideas, and more with the power of AI.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-4xl mx-auto">
              <ShopifyAiContentGenerator />

              <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>How AI Can Revolutionize Your Shopify Content Strategy</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>In today's competitive e-commerce landscape, high-quality content is not just a nice-to-have—it's essential. Content drives traffic, engages customers, and boosts conversions. But creating it consistently is a major challenge. That's where AI comes in.</p>
                            
                            <h3>Overcome Writer's Block & Save Time</h3>
                            <p>This AI Content Generator is designed to be your creative partner. It can help you:</p>
                            <ul>
                                <li><strong>Generate Unique Product Descriptions:</strong> Turn a simple list of features into a compelling story that sells. Highlight benefits, match your brand's tone, and improve your product page SEO.</li>
                                <li><strong>Discover Blog Post Ideas:</strong> Never run out of blog topics. Get suggestions based on your products or industry, helping you attract organic traffic through content marketing.</li>
                                <li><strong>Draft Marketing Copy:</strong> Quickly create copy for emails, social media posts, and ads that resonates with your target audience.</li>
                            </ul>

                             <h3>Optimize for SEO and Conversions</h3>
                            <p>
                                Our tool is trained to understand what makes e-commerce content effective. The generated text is designed to be not only readable and engaging but also optimized for search engines. By naturally including relevant keywords, you can improve your store's visibility on Google and attract more qualified buyers.
                            </p>
                        </CardContent>
                    </Card>
              </div>
          </div>
      </div>
    </>
  );
}
