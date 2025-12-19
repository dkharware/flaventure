
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShopifyAiContentGenerator } from '@/components/tools/ShopifyAiContentGenerator';

export const metadata: Metadata = {
    title: 'Free AI Content Generator for Travel & Food Blogs | Flaventure Tools',
    description: 'Use our free AI tool to generate high-quality blog post ideas, engaging descriptions, and social media copy for your travel and food blog. Save time on content creation.',
    keywords: ['AI content generator', 'travel blog tool', 'food blog ideas', 'AI for bloggers', 'content creation tool'],
};

export default function AiContentGeneratorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'AI Content Generator' },
    ];

  return (
    <>
      <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">AI Content Generator</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Create compelling content for your blog in seconds. Generate post ideas, engaging descriptions, and more with the power of AI.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-4xl mx-auto">
              <ShopifyAiContentGenerator />

              <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
                    <Card className="mt-8 bg-background/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>How AI Can Revolutionize Your Content Strategy</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>In today's competitive digital landscape, high-quality content is not just a nice-to-have—it's essential. Content drives traffic, engages readers, and builds your brand. But creating it consistently is a major challenge. That's where AI comes in.</p>
                            
                            <h3>Overcome Writer's Block & Save Time</h3>
                            <p>This AI Content Generator is designed to be your creative partner. It can help you:</p>
                            <ul>
                                <li><strong>Generate Unique Article Descriptions:</strong> Turn a simple list of ideas into a compelling story that captivates your audience.</li>
                                <li><strong>Discover Blog Post Ideas:</strong> Never run out of blog topics. Get suggestions based on your niche or industry, helping you attract organic traffic through content marketing.</li>
                                <li><strong>Draft Social Media Copy:</strong> Quickly create copy for Instagram, Facebook, and Twitter that resonates with your followers.</li>
                            </ul>

                             <h3>Optimize for SEO and Engagement</h3>
                            <p>
                                Our tool is trained to understand what makes blog content effective. The generated text is designed to be not only readable and engaging but also optimized for search engines. By naturally including relevant keywords, you can improve your site's visibility on Google and attract more readers.
                            </p>
                        </CardContent>
                    </Card>
              </div>
          </div>
      </div>
    </>
  );
}
