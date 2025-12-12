
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

interface Article {
    id: string;
    handle: string;
    title: string;
    publishedAt: string;
    readTime: number;
    image?: {
        url: string;
        altText?: string;
    };
}

const ArticleCard = ({ article }: { article: Article }) => (
    <Link href={article.handle === '#' ? '/blog' : `/blog/${article.handle}`} className="block group h-full">
        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-background/50 backdrop-blur-lg">
            {article.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                    <Image
                    src={article.image.url}
                    alt={article.image.altText || article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}
            <div className="flex flex-col flex-grow p-4">
                <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors flex-grow mb-2 line-clamp-2">{article.title}</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(article.publishedAt), 'PPP')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime} min read</span>
                    </div>
                </div>
                 <div className="mt-4">
                    <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
                        <Link href={`/blog/${article.handle}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </Card>
    </Link>
);


export default function SpotlightBlogs({ articles }: { articles: Article[] }) {
    const isLoading = !articles || articles.length === 0;

    const ArticleCardSkeleton = ({ className }: { className?: string }) => (
         <div className={cn("space-y-3", className)}>
            <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
            <div className="space-y-2 p-2">
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-4 w-1/2" />
                 <Skeleton className="h-5 w-1/3" />
            </div>
        </div>
    )

    return (
        <section className="w-full py-12 md:py-16 bg-background/50 backdrop-blur-lg">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 text-center md:text-left">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Spotlight Blogs</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           Stay up to date with the latest news, tips, and insights.
                        </p>
                    </div>
                     <Button asChild variant="outline">
                        <Link href="/blog">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="mx-auto max-w-7xl pt-8">
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {isLoading ? (
                            <>
                                <ArticleCardSkeleton />
                                <ArticleCardSkeleton />
                                <ArticleCardSkeleton />
                                <ArticleCardSkeleton />
                                <ArticleCardSkeleton />
                                <ArticleCardSkeleton />
                            </>
                        ) : (
                            articles.map((article: any, index) => (
                               <div key={article.id}>
                                <ArticleCard article={article} />
                               </div>
                            ))
                        )}
                   </div>
                </div>
            </div>
        </section>
    );
}
