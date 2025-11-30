
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from './ui/card';
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

const LargeArticleCard = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group col-span-2 row-span-2">
        <Card className="h-full bg-muted/30 p-6 flex flex-col overflow-hidden">
             {article.image && (
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                     <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                </div>
             )}
             <div className="flex flex-col">
                <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <h2 className="text-xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
                <div 
                    className="text-muted-foreground text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }} 
                />
             </div>
        </Card>
    </Link>
);

const SmallArticleCard = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group">
        <Card className="h-full overflow-hidden">
            <div className="relative aspect-square w-full">
                {article.image && (
                     <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-bold font-headline text-lg line-clamp-2">{article.title}</h3>
                 </div>
            </div>
        </Card>
    </Link>
);

const TextArticleCard = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group">
        <Card className="h-full bg-muted/30 p-6 flex flex-col justify-between">
            <div>
                <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.slice(0, 1).map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <h3 className="text-lg font-bold font-headline mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
            </div>
            <div className="flex items-center gap-3 mt-auto">
                 <Avatar className="h-8 w-8">
                    <AvatarImage src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg" alt={article.authorV2.name} />
                    <AvatarFallback>{article.authorV2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-xs">{article.authorV2.name}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(article.publishedAt), 'PPP')}</p>
                </div>
            </div>
        </Card>
    </Link>
);


const HorizontalArticleCard = ({ article }: { article: Article }) => (
    <Link href={`/blog/${article.handle}`} className="block group col-span-2">
         <Card className="h-full bg-muted/30 p-6 flex flex-col md:flex-row gap-6 overflow-hidden">
             <div className="relative w-full md:w-1/2 aspect-video md:aspect-square rounded-lg overflow-hidden flex-shrink-0">
                 {article.image && (
                     <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </div>
             <div className="flex flex-col">
                <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <h2 className="text-xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
                 <div 
                    className="text-muted-foreground text-sm line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ __html: article.excerptHtml }} 
                />
                <div className="flex items-center gap-3 mt-auto">
                    <p className="text-xs text-muted-foreground">{format(new Date(article.publishedAt), 'PPP')}</p>
                </div>
             </div>
        </Card>
    </Link>
)


export function FeaturedArticles({ articles }: { articles: Article[] }) {
    if (articles.length < 5) {
        return <div className="container py-12 text-center">Not enough articles to display this section.</div>
    }
    
    const [
        mainArticle,
        sideArticle,
        bottomArticle1,
        bottomArticle2,
        bottomArticle3,
    ] = articles;

    return (
        <section className="container">
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-6 h-[80vh] min-h-[700px] max-h-[900px]">
                {/* Main Article */}
                <div className="md:col-span-2 lg:col-span-3 row-span-2">
                    {mainArticle && <LargeArticleCard article={mainArticle} />}
                </div>

                {/* Side Small Article */}
                <div className="hidden md:block row-span-1">
                    {sideArticle && <SmallArticleCard article={sideArticle} />}
                </div>

                 {/* Side Text Article */}
                <div className="hidden md:block row-span-1">
                     {bottomArticle1 && <TextArticleCard article={bottomArticle1} />}
                </div>

                 {/* Bottom Horizontal Article */}
                <div className="md:col-span-2 lg:col-span-3 row-span-1">
                    {bottomArticle2 && <HorizontalArticleCard article={bottomArticle2} />}
                </div>
                
                 {/* Last small card */}
                <div className="hidden md:block row-span-1">
                    {bottomArticle3 && <SmallArticleCard article={bottomArticle3} />}
                </div>
            </div>
        </section>
    );
}
