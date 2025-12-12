
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { loadMoreArticles } from '@/app/actions/loadMoreArticles';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Eye, User } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { AdBanner } from './AdBanner';

interface Article {
  id: string;
  handle: string;
  title: string;
  excerptHtml: string;
  publishedAt: string;
  image?: { url: string; altText: string };
  tags: string[];
  viewCount: number;
  authorV2: { name: string };
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string | null;
}

interface ArticleListProps {
  initialArticles: Article[];
  initialPageInfo: PageInfo;
  query?: string;
}

function ArticleCard({ article }: { article: Article }) {
    return (
        <Link key={article.id} href={`/blog/${article.handle}`} className="block group">
        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-background/50 backdrop-blur-lg">
            {article.image && (
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                src={article.image.url}
                alt={article.image.altText || article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                    {article.tags?.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                    ))}
                </div>
            </div>
            )}
            <CardHeader className="p-4">
                <CardTitle className="text-base font-headline group-hover:text-primary transition-colors line-clamp-3">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-4 pt-0">
                <div
                    className="text-sm text-muted-foreground flex-grow line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }}
                />
                <div className="text-xs text-muted-foreground mt-4 pt-4 border-t flex flex-wrap gap-x-4 gap-y-2 items-center justify-between">
                    {article.authorV2 && (
                        <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{article.authorV2.name}</span>
                        </div>
                    )}
                    <span>{format(new Date(article.publishedAt), 'PPP')}</span>
                    <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.viewCount.toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
        </Link>
    );
}

export function ArticleCardSkeleton() {
    return (
        <Card className="h-full flex flex-col overflow-hidden bg-background/50 backdrop-blur-lg">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 flex-grow flex flex-col">
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex-grow space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-3 w-1/4" />
                </div>
            </div>
        </Card>
    )
}


export function ArticleList({ initialArticles, initialPageInfo, query }: ArticleListProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(async () => {
    if (!pageInfo.hasNextPage || isLoading) {
        return;
    }
    setIsLoading(true);
    const { articles: newArticles, pageInfo: newPageInfo } = await loadMoreArticles(
      12,
      query,
      pageInfo.endCursor
    );
    setArticles(prev => [...prev, ...newArticles]);
    setPageInfo(newPageInfo);
    setIsLoading(false);
  }, [pageInfo, isLoading, query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    const loader = loaderRef.current;
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [handleLoadMore]);
  
  const articlesWithAd = [...articles];
  if (articlesWithAd.length >= 4) {
    articlesWithAd.splice(4, 0, 'ad' as any);
  }

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {articlesWithAd.map((article, index) => {
              if(article === 'ad' as any) {
                return <AdBanner key={`ad-${index}`} />;
              }
              return <ArticleCard key={article.id} article={article} />;
            })}
            {isLoading && (
              <>
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
              </>
            )}
        </div>
        <div ref={loaderRef} className="col-span-full h-1" />
    </>
  );
}

