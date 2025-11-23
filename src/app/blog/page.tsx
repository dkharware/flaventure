
import { getArticles } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | easyfreecv',
  description: 'Read the latest articles and tips on resume building, career advice, and job searching from the easyfreecv team.',
};

export default async function BlogPage() {
  const articles = await getArticles(20); // Fetch more articles for the main blog page

  return (
    <div className="container mx-auto py-12 px-6 md:px-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">From Our Blog</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Get the latest insights on resume building, career advice, and industry trends.
        </p>
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: any) => (
            <Link key={article.id} href={`/blog/${article.handle}`} className="block group">
              <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {article.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={article.image.url}
                      alt={article.image.altText || article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                    <div
                        className="text-sm text-muted-foreground flex-grow"
                        dangerouslySetInnerHTML={{ __html: article.excerptHtml }}
                    />
                    <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                        <span>By {article.authorV2.name}</span> &bull; <span>{format(new Date(article.publishedAt), 'PPP')}</span>
                    </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-muted-foreground">No articles found. Please check back later!</p>
        </div>
      )}
    </div>
  );
}
