

import { getArticles, getAllTags } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { Suspense } from 'react';
import { SlidersHorizontal, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogTags } from '@/components/BlogTags';
import { ArticleList, ArticleCardSkeleton } from '@/components/ArticleList';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'E-commerce & Web Dev Blog | shopifydevguide',
  description: 'Read the latest articles on Shopify, Webflow, headless commerce, and modern web development from the shopifydevguide team.',
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
  
  const { articles, pageInfo } = await getArticles(
      POSTS_PER_PAGE + 1, 
      query
  );
  
  const allTags = await getAllTags();
  const { articles: recentPosts } = await getArticles(5);

  const pageTitle = tagQuery ? `Posts tagged with "${tagQuery}"` : (searchQuery ? `Search results for "${searchQuery}"` : "E-commerce & Web Dev Blog");
  const pageDescription = tagQuery || searchQuery ? "" : "Get the latest insights on Shopify, headless commerce, and industry trends.";

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const initialArticles = articles.slice(1);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
  ];

  return (
    <div className="container mx-auto py-8 px-3 md:py-12 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="lg:hidden fixed bottom-24 right-4 z-40">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" className="rounded-full shadow-lg">
                        <SlidersHorizontal className="h-5 w-5" />
                        <span className="sr-only">Open Filters</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="hide-scrollbar">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Blog Sidebar</SheetTitle>
                    <SheetDescription className="sr-only">Contains blog search, tags, and recent posts.</SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-full pr-6">
                    <Suspense fallback={<div>Loading sidebar...</div>}>
                        <BlogSidebar tags={allTags} recentPosts={recentPosts} />
                    </Suspense>
                  </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
        <div className="relative overflow-hidden rounded-xl p-8 my-8 bg-background">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 via-white to-pink-200/50 dark:from-yellow-900/10 dark:via-background dark:to-pink-900/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#fecaca,transparent)] opacity-20 dark:opacity-5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_0px,#fef9c3,transparent)] opacity-20 dark:opacity-5"></div>
            </div>
            <div className="relative z-10 text-center">
                <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">{pageTitle}</h1>
                {pageDescription && <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{pageDescription}</p>}
            </div>
        </div>


        {allTags && allTags.length > 0 && !searchQuery && !tagQuery && (
          <div className="mb-12">
            <BlogTags tags={allTags} />
          </div>
        )}

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
                      {featuredArticle && (
                         <Link key={featuredArticle.id} href={`/blog/${featuredArticle.handle}`} className="block group">
                            <Card className="h-full flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                                {featuredArticle.image && (
                                <div className="relative h-48 md:h-auto md:w-1/2 overflow-hidden">
                                    <Image
                                    src={featuredArticle.image.url}
                                    alt={featuredArticle.image.altText || featuredArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                                        <div className="text-xs text-muted-foreground mt-4 pt-4 border-t flex items-center justify-between">
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
                        initialArticles={initialArticles} 
                        initialPageInfo={pageInfo} 
                        query={query} 
                      />
                      
                    </div>
                ) : (
                    <div className="text-center py-16 border rounded-lg bg-muted/20">
                        <h3 className="text-xl font-semibold">No Articles Found</h3>
                        <p className="text-muted-foreground mt-2">Please try another search or tag, or check back later.</p>
                        <Button asChild variant="outline" className="mt-4">
                            <Link href="/blog">Back to Blog</Link>
                        </Button>
                    </div>
                )}
              </Suspense>
            </main>
            <aside className="lg:col-span-1 lg:mt-0 hidden lg:block">
                <Suspense fallback={<div>Loading sidebar...</div>}>
                    <BlogSidebar tags={allTags} recentPosts={recentPosts} />
                </Suspense>
            </aside>
        </div>
    </div>
  );
}
