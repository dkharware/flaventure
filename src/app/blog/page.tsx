
'use client';

import { getArticles, getAllTags, isUsingPlaceholderData } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense, useState, useEffect } from 'react';
import { Eye, User, ArrowRight, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleList, ArticleCardSkeleton } from '@/components/ArticleList';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogSearch } from '@/components/BlogSearch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SidebarWrapper } from '@/components/SidebarWrapper';
import FaqSection from '@/components/FaqSection';
import { useSearchParams } from 'next/navigation';

function FeaturedArticleSkeleton() {
    return (
        <Card className="h-full flex flex-col md:flex-row overflow-hidden bg-background/50 backdrop-blur-lg">
            <Skeleton className="h-48 md:h-auto md:w-1/2" />
            <div className="flex-1 flex flex-col p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/10">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
        </Card>
    );
}

function DemoContentWarning() {
  const [isDemo, setIsDemo] = useState(false);
  useEffect(() => {
    setIsDemo(isUsingPlaceholderData());
  }, []);

  if (!isDemo) {
    return null;
  }
  return (
    <Alert variant="destructive" className="mb-8 bg-yellow-500/10 border-yellow-500/50 text-yellow-200">
      <AlertTriangle className="h-4 w-4 !text-yellow-400" />
      <AlertTitle className="text-yellow-300 font-bold">Demo Content Active</AlertTitle>
      <AlertDescription>
        This site is displaying placeholder content. To connect your own Shopify store, add your credentials to the `.env` file.
      </AlertDescription>
    </Alert>
  );
}

export default function BlogPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const tag = searchParams.get('tag') || '';

  const [articles, setArticles] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<any>({ hasNextPage: false });
  const [isLoading, setIsLoading] = useState(true);
  const [clientQuery, setClientQuery] = useState(query);

  const initialLoadQuery = query || (tag ? `tag:'${tag}'` : undefined);

  useEffect(() => {
    setIsLoading(true);
    getArticles(100, initialLoadQuery).then(({ articles, pageInfo }) => {
      setArticles(articles);
      setPageInfo(pageInfo);
      setIsLoading(false);
    });
  }, [tag, query, initialLoadQuery]);
  
  const pageTitle = tag ? `Posts tagged with "${tag}"` : (query ? `Search results for "${query}"` : "Explore Our Stories");
  const pageDescription = tag || query ? `Browsing stories for: ${tag || query}` : "Our latest articles, travel guides, and delicious recipes from around the world.";

  const isSearchActive = !!clientQuery || !!tag;
  const featuredArticle = !isSearchActive && articles.length > 0 ? articles[0] : null;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
  ];

  return (
    <>
      <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
        <div className="container mx-auto px-3 md:px-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="my-8 text-center">
            <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">{pageTitle}</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{pageDescription}</p>
            <div className="mt-6 max-w-xl mx-auto">
              <BlogSearch initialQuery={clientQuery} onSearch={setClientQuery} isLive={true} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-3 md:py-12 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3">
              <DemoContentWarning />
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
                {isLoading ? (
                    <div className="space-y-12">
                        {!tag && !query && <FeaturedArticleSkeleton />}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                        </div>
                    </div>
                ) : articles.length > 0 ? (
                    <div className="space-y-12">
                      {featuredArticle && (
                         <div className="block group">
                            <Card className="h-full flex flex-col md:flex-row overflow-hidden bg-background/50 backdrop-blur-lg border-border/20 transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                                {featuredArticle.image && (
                                <div className="relative h-48 md:h-auto md:w-1/2 overflow-hidden">
                                    <Link href={`/blog/${featuredArticle.handle}`}>
                                        <Image
                                        src={featuredArticle.image.url}
                                        alt={featuredArticle.image.altText || featuredArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </Link>
                                </div>
                                )}
                                <div className="flex-1 flex flex-col p-6">
                                    <div className="flex flex-wrap gap-2 z-10 mb-4">
                                        {featuredArticle.tags?.slice(0, 2).map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                                        ))}
                                    </div>
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors line-clamp-3">
                                            <Link href={`/blog/${featuredArticle.handle}`}>{featuredArticle.title}</Link>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col p-0 mt-4">
                                        <div
                                            className="text-sm text-muted-foreground flex-grow line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: featuredArticle.excerptHtml }}
                                        />
                                        <div className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/10 flex flex-wrap gap-x-4 gap-y-2 items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Image src="https://picsum.photos/seed/raksha/20/20" alt={featuredArticle.authorV2.name} width={20} height={20} className="rounded-full" />
                                                <span>{featuredArticle.authorV2.name}</span>
                                            </div>
                                            <span>{new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                <span>{featuredArticle.viewCount.toLocaleString()} views</span>
                                            </div>
                                        </div>
                                         <div className="mt-6">
                                            <Button asChild variant="link" className="p-0 h-auto text-primary">
                                                <Link href={`/blog/${featuredArticle.handle}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </div>
                      )}

                      <ArticleList 
                        initialArticles={articles.slice(featuredArticle ? 1 : 0)} 
                        initialPageInfo={pageInfo} 
                        query={initialLoadQuery}
                        clientQuery={clientQuery}
                      />
                      
                    </div>
                ) : (
                    <div className="text-center py-16 border border-border/20 rounded-lg bg-card">
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
                 <SidebarWrapper />
            </aside>
        </div>
    </div>
    <FaqSection />
    </>
  );
}
