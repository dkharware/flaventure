
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format } from 'date-fns';

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

const AuthorInfo = ({ article }: { article: Article }) => (
    <div className="flex items-center gap-2 mt-3">
        <Avatar className="h-6 w-6">
            <AvatarImage src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg" alt={article.authorV2.name} />
            <AvatarFallback>{article.authorV2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-xs text-muted-foreground">{article.authorV2.name}</p>
        <span className="text-muted-foreground text-xs">•</span>
        <p className="text-xs text-muted-foreground">{format(new Date(article.publishedAt), 'dd.MM.yyyy')}</p>
        <span className="text-muted-foreground text-xs">•</span>
        {article.tags.slice(0, 1).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
        ))}
    </div>
);

const LargeHeroCard = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group col-span-2">
        <Card className="h-full overflow-hidden border-none shadow-none bg-transparent">
             {article.image && (
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4">
                     <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                </div>
             )}
             <div className="flex flex-col p-1">
                <AuthorInfo article={article} />
                <h2 className="text-xl md:text-2xl font-bold font-headline mt-3 group-hover:text-primary transition-colors">{article.title}</h2>
                <div 
                    className="text-muted-foreground text-sm mt-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }} 
                />
             </div>
        </Card>
    </Link>
);


const StandardCard = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group">
        <Card className="h-full overflow-hidden border-none shadow-none bg-transparent">
             {article.image && (
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4">
                     <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
             )}
             <div className="flex flex-col p-1">
                <AuthorInfo article={article} />
                <h3 className="text-lg font-bold font-headline mt-3 group-hover:text-primary transition-colors">{article.title}</h3>
                <div 
                    className="text-muted-foreground text-sm mt-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }} 
                />
             </div>
        </Card>
    </Link>
);

const ListItemCard = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group">
        <Card className="h-full overflow-hidden border-none shadow-none bg-transparent">
            <div className="flex gap-4 items-center">
                {article.image && (
                    <div className="relative w-24 h-24 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={article.image.url}
                            alt={article.image.altText || article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}
                <div className="flex flex-col p-1">
                     <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg" alt={article.authorV2.name} />
                            <AvatarFallback>{article.authorV2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-xs text-muted-foreground">{article.authorV2.name}</p>
                        <span className="text-muted-foreground text-xs">•</span>
                        <p className="text-xs text-muted-foreground">{format(new Date(article.publishedAt), 'dd.MM.yyyy')}</p>
                    </div>
                    <h3 className="text-base font-bold font-headline mt-1.5 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                </div>
            </div>
        </Card>
    </Link>
);


export function FeaturedArticles({ articles }: { articles: Article[] }) {
    if (articles.length < 7) {
        return <div className="container py-12 text-center">Not enough articles to display this section.</div>
    }
    
    const [
        mainArticle,
        bottomArticle1,
        bottomArticle2,
        sideArticle1,
        sideArticle2,
        sideArticle3,
        sideArticle4
    ] = articles;

    return (
        <section className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
                {/* Left Side */}
                <div className="lg:col-span-2 space-y-12">
                    {mainArticle && <LargeHeroCard article={mainArticle} />}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {bottomArticle1 && <StandardCard article={bottomArticle1} />}
                        {bottomArticle2 && <StandardCard article={bottomArticle2} />}
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-1 space-y-8">
                    {sideArticle1 && <ListItemCard article={sideArticle1} />}
                    {sideArticle2 && <ListItemCard article={sideArticle2} />}
                    {sideArticle3 && <ListItemCard article={sideArticle3} />}
                    {sideArticle4 && <ListItemCard article={sideArticle4} />}
                </div>
            </div>
        </section>
    );
}
