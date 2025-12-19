
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MetaTagGenerator } from '@/components/tools/MetaTagGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export const metadata: Metadata = {
    title: 'Free Meta Tag Generator for SEO & Social Media | Flaventure Tools',
    description: 'Generate SEO-friendly meta tags (title, description), Open Graph tags, and Twitter cards for your blog posts and pages to improve search visibility and social sharing.',
    keywords: ['meta tags', 'meta tag generator', 'SEO tool', 'Open Graph generator', 'Twitter card generator', 'social media SEO'],
};

export default function MetaTagGeneratorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools' },
        { label: 'Meta Tag Generator' },
    ];

  return (
    <>
      <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Meta Tag Generator</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Create perfect, SEO-friendly meta tags for your content to boost search rankings and social media appearance.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-4xl mx-auto">
              <MetaTagGenerator />

               <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
                    <Card className="mt-8 bg-background/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>What Are Meta Tags and Why Are They Important?</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>Meta tags are snippets of text that describe a page's content; they don't appear on the page itself, but only in the page's source code. They are essential for Search Engine Optimization (SEO) and for controlling how your content appears when shared on social media.</p>
                            
                            <h3>Key Meta Tags Covered by This Tool:</h3>
                            <ul>
                                <li><strong>Title Tag:</strong> The main title displayed in search engine results and browser tabs. It's a critical factor for search rankings.</li>
                                <li><strong>Meta Description:</strong> A brief summary of the page's content shown in search results. A compelling description encourages users to click on your link.</li>
                                <li><strong>Open Graph Tags (og:*):</strong> Used by Facebook, LinkedIn, and other social platforms to display rich previews of your content, including a title, description, and image.</li>
                                <li><strong>Twitter Card Tags (twitter:*):</strong> Similar to Open Graph, but specifically for Twitter. They allow you to attach photos and videos to Tweets that link to your content.</li>
                            </ul>

                             <h3>How This Improves Your SEO</h3>
                            <p>
                                By providing search engines and social platforms with clear, structured information, you increase your chances of ranking higher and gaining more traffic. Well-crafted meta tags lead to better click-through rates from search results and more engaging social media shares, driving more potential customers to your site.
                            </p>
                        </CardContent>
                    </Card>
              </div>
          </div>
      </div>
    </>
  );
}
