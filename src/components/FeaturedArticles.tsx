
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
}

const AuthorInfo = ({ article, className }: { article: Article, className?: string }) => (
    <div className={cn("flex items-center gap-2", className)}>
        <Avatar className="h-6 w-6">
            <AvatarImage src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg" alt={article.authorV2.name} />
            <AvatarFallback>{article.authorV2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-xs text-muted-foreground">{article.authorV2.name}</p>
        <span className="text-muted-foreground text-xs">•</span>
        <p className="text-xs text-muted-foreground">{format(new Date(article.publishedAt), 'dd MMM, yyyy')}</p>
    </div>
);

const LargeHeroCard = ({ article }: { article: Article }) => (
    <div className="block group col-span-2">
        <Card className="h-full overflow-hidden rounded-lg bg-muted/20 p-6 flex flex-col md:flex-row gap-6">
             {article.image && (
                <div className="relative w-full md:w-1/2 aspect-[16/9] rounded-lg overflow-hidden">
                    <Link href={`/blog/${article.handle}`} className="block h-full w-full">
                         <Image
                            src={article.image.url}
                            alt={article.image.altText || article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                    </Link>
                </div>
             )}
             <div className="flex flex-col flex-grow p-1 md:w-1/2">
                <AuthorInfo article={article} />
                <h2 className="text-xl md:text-2xl font-bold font-headline mt-4 group-hover:text-primary transition-colors line-clamp-3">
                    <Link href={`/blog/${article.handle}`}>{article.title}</Link>
                </h2>
                <div 
                    className="text-muted-foreground text-sm mt-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }} 
                />
                <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map(tag => (
                         <Badge key={tag} variant="secondary">
                            {tag}
                         </Badge>
                    ))}
                </div>
             </div>
        </Card>
    </div>
);

const ListItemCard = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group">
        <Card className="h-full overflow-hidden border-b rounded-none p-0 pb-4 bg-transparent shadow-none">
            <div className="flex gap-4 items-center">
                {article.image && (
                    <div className="relative w-20 h-20 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={article.image.url}
                            alt={article.image.altText || article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                )}
                <div className="flex flex-col flex-grow">
                    <h3 className="text-sm font-bold font-headline group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                     <div className="flex items-center gap-2 mt-1.5">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg" alt={article.authorV2.name} />
                            <AvatarFallback>{article.authorV2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-xs text-muted-foreground">{article.authorV2.name}</p>
                        <span className="text-muted-foreground text-xs">•</span>
                        <p className="text-xs text-muted-foreground">{format(new Date(article.publishedAt), 'dd.MM.yyyy')}</p>
                    </div>
                </div>
            </div>
        </Card>
    </Link>
);


export function FeaturedArticles({ articles }: { articles: Article[] }) {
    if (articles.length < 5) {
        return null;
    }
    
    const [
        mainArticle,
        sideArticle1,
        sideArticle2,
        sideArticle3,
        sideArticle4
    ] = articles;

    return (
        <section className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
                {/* Left Side */}
                <div className="lg:col-span-2">
                    {mainArticle && <LargeHeroCard article={mainArticle} />}
                </div>

                {/* Right Side */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="font-bold font-headline text-lg">Latest Articles</h3>
                    {sideArticle1 && <ListItemCard article={sideArticle1} />}
                    {sideArticle2 && <ListItemCard article={sideArticle2} />}
                    {sideArticle3 && <ListItemCard article={sideArticle3} />}
                    {sideArticle4 && <ListItemCard article={sideArticle4} />}
                </div>
            </div>
        </section>
    );
}
