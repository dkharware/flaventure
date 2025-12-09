

import { getArticles } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { Suspense } from 'react';
import { Eye, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleList, ArticleCardSkeleton } from '@/components/ArticleList';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogSearch } from '@/components/BlogSearch';

export const metadata: Metadata = {
  title: 'E-commerce & Web Dev Blog | storedevguide',
  description: 'Read the latest articles on Shopify, Webflow, headless commerce, and modern web development from the storedevguide team.',
};

interface BlogPageProps {
    searchParams?: {
        query?: string;
        tag?: string;
    };
}

const POSTS_PER_PAGE = 11; // 1 for featured, 10 for grid on first page

function FeaturedArticleSkeleton() {
    return (
        <Card className="h-full flex flex-col md:flex-row overflow-hidden">
            <Skeleton className="h-48 md:h-auto md:w-1/2" />
            <div className="flex-1 flex flex-col p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
        </Card>
    );
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
  
  // We only fetch articles now, sidebar data is fetched on the client.
  const { articles, pageInfo } = await getArticles(
      POSTS_PER_PAGE + 1, 
      query
  );
  
  const pageTitle = tagQuery ? `Posts tagged with "${tagQuery}"` : (searchQuery ? `Search results for "${searchQuery}"` : "From the Blog");
  const pageDescription = tagQuery || searchQuery ? `Browsing articles for: ${tagQuery || searchQuery}` : "Get the latest insights on Shopify, headless commerce, and industry trends.";

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const initialArticles = articles.slice(1);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
  ];

  return (
    <div className="container mx-auto py-8 px-3 md:py-12 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="relative overflow-hidden rounded-xl p-8 my-8 text-center">
            <div
                className="absolute inset-0 z-0 opacity-10 dark"
                style={{
                    backgroundImage:
                    'radial-gradient(circle at 40% 60%, hsl(var(--primary) / 0.2), transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.2), transparent 50%)',
                }}
            />
            <div className="relative z-10">
                <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">{pageTitle}</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{pageDescription}</p>
                <div className="mt-6 max-w-xl mx-auto">
                  <BlogSearch initialQuery={searchQuery} />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3">
              <Suspense fallback={
                <div className="space-y-12">
                    <FeaturedArticleSkeleton />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <ArticleCardSkeleton />
                        <ArticleCardSkeleton />
                        <ArticleCardSkeleton />
                        <ArticleCardSkeleton />
                    </div>
                </div>
              }>
                {articles && articles.length > 0 ? (
                    <div className="space-y-12">
                      {featuredArticle && !searchQuery && !tagQuery && (
                         <Link key={featuredArticle.id} href={`/blog/${featuredArticle.handle}`} className="block group">
                            <Card className="h-full flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                                {featuredArticle.image && (
                                <div className="relative h-48 md:h-auto md:w-1/2 overflow-hidden">
                                    <Image
                                    src={featuredArticle.image.url}
                                    alt={featuredArticle.image.altText || featuredArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                                        {featuredArticle.tags?.slice(0, 2).map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                )}
                                <div className="flex-1 flex flex-col p-6">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors line-clamp-3">{featuredArticle.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col p-0 mt-4">
                                        <div
                                            className="text-sm text-muted-foreground flex-grow line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: featuredArticle.excerptHtml }}
                                        />
                                        <div className="text-xs text-muted-foreground mt-4 pt-4 border-t flex flex-wrap gap-x-4 gap-y-2 items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                <span>{featuredArticle.authorV2.name}</span>
                                            </div>
                                            <span>{format(new Date(featuredArticle.publishedAt), 'PPP')}</span>
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                <span>{featuredArticle.viewCount.toLocaleString()} views</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                      )}

                      <ArticleList 
                        initialArticles={searchQuery || tagQuery ? articles : initialArticles} 
                        initialPageInfo={pageInfo} 
                        query={query} 
                      />
                      
                    </div>
                ) : (
                    <div className="text-center py-16 border rounded-lg bg-muted/20">
                        <h2 className="text-xl font-semibold">No Articles Found</h2>
                        <p className="text-muted-foreground mt-2">Please try another search or tag, or check back later.</p>
                        <Button asChild variant="outline" className="mt-4">
                            <Link href="/blog">Back to Blog</Link>
                        </Button>
                    </div>
                )}
              </Suspense>
            </main>
            <aside className="lg:col-span-1 lg:mt-0">
                 <Suspense fallback={
                    <div className="space-y-8">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                 }>
                    <div className="lg:sticky lg:top-28">
                      <BlogSidebar />
                    </div>
                </Suspense>
            </aside>
        </div>
    </div>
  );
}
