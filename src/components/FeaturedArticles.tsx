
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
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
                <Link href={`/blog/${article.handle}`} className="block overflow-hidden rounded-xl aspect-[16/9] relative">
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
                {article.tags[0] && (
                    <Link href={`/blog?tag=${article.tags[0]}`} className="mb-2 w-fit">
                        <Badge variant="secondary">{article.tags[0]}</Badge>
                    </Link>
                )}
                <h2 className="text-2xl lg:text-2xl font-bold font-headline mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${article.handle}`}>{article.title}</Link>
                </h2>
                <div 
                    className="text-muted-foreground text-sm line-clamp-2 mb-4"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }} 
                />

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg" alt={article.authorV2.name} />
                            <AvatarFallback>{article.authorV2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-sm">{article.authorV2.name}</p>
                            <p className="text-xs text-muted-foreground">Expert Contributor</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const SecondaryArticleCard = ({ article }: { article: Article }) => {
    return (
        <Link href={`/blog/${article.handle}`} className="block group">
            <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
                {article.image && (
                    <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="mt-3">
                 {article.tags[0] && (
                     <Badge variant="secondary" className="mb-1">{article.tags[0]}</Badge>
                )}
                <h3 className="font-semibold mt-1 text-base group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
            </div>
        </Link>
    );
};


export function FeaturedArticles({ articles }: { articles: Article[] }) {
    if (articles.length < 5) {
        return <div className="container py-12 text-center">Not enough articles to display this section.</div>
    }
    
    const [
        mainArticle,
        ...secondaryArticles
    ] = articles;

    return (
        <section className="container">
            {mainArticle && <MainArticleCard article={mainArticle} />}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mt-12">
                {secondaryArticles.slice(0, 4).map(article => (
                    <SecondaryArticleCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}
