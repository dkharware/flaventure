
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Eye, Clock, Calendar } from 'lucide-react';
import { getArticles } from '@/lib/shopify';
import { Skeleton } from './ui/skeleton';

interface Article {
    id: string;
    handle: string;
    title: string;
    excerptHtml: string;
    publishedAt: string;
    image?: {
        url: string;
        altText?: string;
    };
    authorV2: {
        name: string;
    };
    tags: string[];
    readTime: number;
    viewCount: number;
}

const ClientFormattedDate = ({ dateString, formatString }: { dateString: string, formatString: string }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        setFormattedDate(format(new Date(dateString), formatString));
    }, [dateString, formatString]);

    if (!formattedDate) {
        return null;
    }

    return (
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
    );
};


const AuthorInfo = ({ article, className }: { article: Article, className?: string }) => (
    <div className={cn("flex items-center gap-2", className)}>
        <Avatar className="h-6 w-6">
            <AvatarImage src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg" alt={article.authorV2.name} />
            <AvatarFallback>{article.authorV2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-xs text-muted-foreground">{article.authorV2.name}</p>
    </div>
);

const LargeHeroCard = ({ article }: { article: Article }) => (
    <div className="block group relative overflow-hidden rounded-lg">
        {article.image && (
        <div className="absolute inset-0">
            <Image
                src={article.image.url}
                alt={article.image.altText || article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        )}
        <div className="relative p-8 md:p-12 flex flex-col justify-end h-[500px] text-white">
            <div className="space-y-4">
                <AuthorInfo article={article} />
                <h2 className="text-3xl md:text-4xl font-bold font-headline group-hover:text-primary transition-colors line-clamp-3">
                    <Link href={`/blog/${article.handle}`}>{article.title}</Link>
                </h2>
                <div 
                    className="text-white/80 text-sm mt-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }} 
                />
                 <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-white/80">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(article.publishedAt), 'PPP')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        <span>{article.viewCount.toLocaleString()} views</span>
                    </div>
                </div>
                 <div className="mt-6">
                    <Button asChild>
                        <Link href={`/blog/${article.handle}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
);


const PopularArticleItem = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group">
        <Card className="h-full overflow-hidden border-b border-border/20 rounded-none p-0 pb-4 bg-transparent shadow-none">
            <div className="flex gap-4 items-start">
                {article.image && (
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={article.image.url}
                            alt={article.image.altText || article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                )}
                <div className="flex flex-col flex-grow w-2/3">
                    <h3 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                     <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                        <span>{article.readTime} min read</span>
                        <span>&bull;</span>
                        <span>{article.viewCount.toLocaleString()} views</span>
                    </div>
                </div>
            </div>
        </Card>
    </Link>
);


export function FeaturedArticles({ articles: latestArticles }: { articles: Article[] }) {
    const [popularArticles, setPopularArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPopular() {
            setIsLoading(true);
            try {
                const { articles: fetchedPopular } = await getArticles(4, `(tag:'popular' OR tag:'featured')`);
                if (fetchedPopular.length > 0) {
                    setPopularArticles(fetchedPopular);
                } else {
                    // Fallback to latest articles if no popular ones are found
                    setPopularArticles(latestArticles.slice(1, 5));
                }
            } catch (e) {
                console.error("Failed to fetch popular articles, using latest instead.", e);
                setPopularArticles(latestArticles.slice(1, 5));
            } finally {
                setIsLoading(false);
            }
        }
        fetchPopular();
    }, [latestArticles]);
    
    if (!latestArticles || latestArticles.length === 0) {
        return <div className="hidden">No articles to display.</div>;
    }

    const mainArticle = latestArticles[0];

    return (
        <section className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
                <div className="lg:col-span-2 space-y-8">
                     {mainArticle && <LargeHeroCard article={mainArticle} />}
                </div>

                <div className="lg:col-span-1 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold font-headline text-xl">Popular Articles</h3>
                    </div>
                    
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex gap-4 items-start border-b border-border/20 pb-4">
                                <div className='w-1/3'>
                                    <Skeleton className="w-24 h-16 rounded-lg flex-shrink-0" />
                                </div>
                                <div className="flex flex-col flex-grow space-y-2 w-2/3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        ))
                    ) : (
                        popularArticles.map(article => <PopularArticleItem key={article.id} article={article} />)
                    )}
                </div>
            </div>
        </section>
    );
}
