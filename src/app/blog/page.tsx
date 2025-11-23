
import { getArticles, getAllTags } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blog | easyfreecv',
  description: 'Read the latest articles and tips on resume building, career advice, and job searching from the easyfreecv team.',
};

interface BlogPageProps {
    searchParams?: {
        query?: string;
        tag?: string;
    };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const searchQuery = searchParams?.query;
  const tagQuery = searchParams?.tag;
  
  let query;
  if (searchQuery) {
    query = `title:*${searchQuery}* OR body:*${searchQuery}*`;
  } else if (tagQuery) {
    query = `tag:'${tagQuery}'`;
  }

  const articles = await getArticles(20, query);
  const allTags = await getAllTags();
  const recentPosts = await getArticles(5);

  const pageTitle = tagQuery ? `Posts tagged with "${tagQuery}"` : (searchQuery ? `Search results for "${searchQuery}"` : "From Our Blog");
  const pageDescription = tagQuery || searchQuery ? "" : "Get the latest insights on resume building, career advice, and industry trends.";

  return (
    <div className="container mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3">
                 <div className="mb-12">
                    <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">{pageTitle}</h1>
                    {pageDescription && <p className="text-lg text-muted-foreground mt-2 max-w-2xl">{pageDescription}</p>}
                </div>

                {articles && articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <p className="text-muted-foreground">No articles found. Please try another search or tag.</p>
                    </div>
                )}
            </main>
            <aside className="lg:col-span-1 lg:mt-24">
                <Suspense fallback={<div>Loading sidebar...</div>}>
                    <BlogSidebar tags={allTags} recentPosts={recentPosts} />
                </Suspense>
            </aside>
        </div>
    </div>
  );
}
