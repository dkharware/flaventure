
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArticles } from '@/lib/shopify';
import { format } from 'date-fns';
import placeholderArticles from '@/lib/placeholder-articles.json';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

interface Article {
    id: string;
    handle: string;
    title: string;
    publishedAt: string;
    image?: {
        url: string;
        altText?: string;
    };
}

const ArticleCard = ({ article }: { article: Article }) => (
    <Link href={article.handle === '#' ? '/blog' : `/blog/${article.handle}`} className="block group h-full">
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
            <div className="flex flex-col flex-grow">
                <CardHeader>
                    <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                        {format(new Date(article.publishedAt), 'PPP')}
                    </p>
                </CardContent>
            </div>
        </Card>
    </Link>
);


export default function BlogSection() {
    const [articles, setArticles] = useState<Article[]>(placeholderArticles as Article[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { articles: fetchedArticles } = await getArticles(9);
                if (fetchedArticles.length > 0) {
                    // Shuffle the array
                    const shuffledArticles = fetchedArticles.sort(() => 0.5 - Math.random());
                    setArticles(shuffledArticles);
                }
            } catch (error) {
                console.error("Failed to fetch articles, using placeholders.", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, []);

    const ArticleCardSkeleton = ({ className }: { className?: string }) => (
         <div className={cn("space-y-3", className)}>
            <Skeleton className="h-48 w-full" />
            <div className="space-y-2 p-2">
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    )

    return (
        <section className="w-full py-12 md:py-16 bg-muted/20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Latest Articles</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           Stay up to date with the latest news, tips, and insights.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-5xl pt-8">
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {isLoading ? (
                            <>
                                <ArticleCardSkeleton />
                                <ArticleCardSkeleton className="hidden sm:block" />
                                <ArticleCardSkeleton className="hidden lg:block" />
                            </>
                        ) : (
                            articles.slice(0,3).map((article: any, index) => (
                               <div key={article.id} className={cn({
                                    'hidden sm:block': index === 1,
                                    'hidden lg:block': index === 2,
                               })}>
                                <ArticleCard article={article} />
                               </div>
                            ))
                        )}
                   </div>
                </div>
                 <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/blog">
                            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
