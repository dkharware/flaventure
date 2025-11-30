
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


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

const MainArticleCard = ({ article }: { article: Article }) => {
    return (
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center bg-muted/50 p-6 rounded-2xl overflow-hidden group">
            {article.image && (
                <Link href={`/blog/${article.handle}`} className="block overflow-hidden rounded-xl aspect-[4/3] relative">
                    <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                </Link>
            )}
            <div className="flex flex-col h-full">
                <h2 className="text-2xl lg:text-3xl font-bold font-headline mb-4 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${article.handle}`}>{article.title}</Link>
                </h2>
                <div 
                    className="text-muted-foreground text-sm line-clamp-3 mb-6"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }} 
                />

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://i.pravatar.cc/40?u=${article.authorV2.name}`} alt={article.authorV2.name} />
                            <AvatarFallback>{article.authorV2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-sm">{article.authorV2.name}</p>
                            <p className="text-xs text-muted-foreground">Expert Contributor</p>
                        </div>
                    </div>
                     {article.tags[0] && (
                        <Link href={`/blog?tag=${article.tags[0]}`}>
                            <Badge variant="outline">{article.tags[0]}</Badge>
                        </Link>
                    )}
                </div>
            </div>
        </Card>
    );
};

const SecondaryArticleCard = ({ article }: { article: Article }) => {
    return (
        <Link href={`/blog/${article.handle}`} className="block group">
            <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                {article.image && (
                    <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {article.tags[0] && (
                     <Badge variant="secondary" className="absolute top-3 left-3 z-10 bg-white/20 backdrop-blur-sm text-white border-none">{article.tags[0]}</Badge>
                )}
                <div className="absolute top-3 right-3 z-10 p-1.5 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4 text-white" />
                </div>
            </div>
            <h3 className="font-semibold mt-3 text-base group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
        </Link>
    );
};


export function FeaturedArticles({ articles }: { articles: Article[] }) {
    if (articles.length < 4) {
        return <div className="container py-12 text-center">Not enough articles to display this section.</div>
    }
    
    const [
        mainArticle,
        ...secondaryArticles
    ] = articles;

    return (
        <section className="container">
            {mainArticle && <MainArticleCard article={mainArticle} />}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 mt-12">
                {secondaryArticles.slice(0, 3).map(article => (
                    <SecondaryArticleCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}
