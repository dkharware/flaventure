
'use client';

import { useState, useEffect, useMemo, Fragment } from 'react';
import { loadMoreArticles } from '@/app/actions/loadMoreArticles';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, User } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

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
  clientQuery?: string;
}

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-muted text-foreground p-0">
              {part}
            </mark>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          )
        )}
      </span>
    );
};

function ArticleCard({ article, highlight }: { article: Article, highlight?: string }) {
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
                sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                    {article.tags?.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                    ))}
                </div>
            </div>
            )}
            <div className="p-4 flex-grow flex flex-col">
                <CardHeader className="p-0">
                    <CardTitle className="text-base font-headline group-hover:text-primary transition-colors line-clamp-3">
                      <HighlightedText text={article.title} highlight={highlight || ''} />
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col p-0 mt-2">
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
                        <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.viewCount.toLocaleString()}</span>
                        </div>
                    </div>
                </CardContent>
            </div>
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


export function ArticleList({ initialArticles, initialPageInfo, query, clientQuery }: ArticleListProps) {
  const [allArticles, setAllArticles] = useState(initialArticles);

  useEffect(() => {
    setAllArticles(initialArticles);
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    if (!clientQuery) {
        return allArticles;
    }
    return allArticles.filter(article =>
      article.title.toLowerCase().includes(clientQuery.toLowerCase())
    );
  }, [allArticles, clientQuery]);
  

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} highlight={clientQuery} />
            ))}
        </div>
        {filteredArticles.length === 0 && clientQuery && (
          <div className="text-center py-16 border border-border/20 rounded-lg bg-card col-span-full">
              <h2 className="text-xl font-semibold">No Articles Found</h2>
              <p className="text-muted-foreground mt-2">No articles match your search for "{clientQuery}".</p>
          </div>
        )}
    </>
  );
}
