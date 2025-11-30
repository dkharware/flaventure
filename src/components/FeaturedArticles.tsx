
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowRight, Flame } from 'lucide-react';
import { Badge } from './ui/badge';
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
    tags: string[];
}

export function FeaturedArticles({ articles }: { articles: Article[] }) {
    const [
        mainArticle,
        secondaryArticle,
        tertiaryArticle,
        quaternaryArticle,
        linkArticle1,
        linkArticle2
    ] = articles;

    const tags = Array.from(new Set(articles.flatMap(a => a.tags))).slice(0, 8);

    if (articles.length < 6) {
        return <div className="container py-12 text-center">Not enough articles to display this section.</div>
    }

    return (
        <section className="container py-8 md:py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Blog</h1>
                <Button variant="outline" asChild>
                    <Link href="/blog">
                        Read Our Blog <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                {mainArticle && (
                    <Link href={`/blog/${mainArticle.handle}`} className="group block">
                        <Card className="h-full w-full overflow-hidden relative aspect-[4/5] md:aspect-auto">
                            {mainArticle.image && (
                                <Image
                                    src={mainArticle.image.url}
                                    alt={mainArticle.image.altText || mainArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute top-4 left-4">
                                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0 flex items-center gap-1">
                                    <Flame className="h-4 w-4 text-orange-400" /> Hot
                                </Badge>
                            </div>
                            <div className="absolute bottom-0 p-6 text-white">
                                <div className="flex items-center gap-2 text-sm mb-2">
                                    <span className="font-semibold">{mainArticle.tags[0]}</span>
                                    <span>&bull;</span>
                                    <span>{format(new Date(mainArticle.publishedAt), 'dd MMM')}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold font-headline leading-tight line-clamp-3 group-hover:underline">
                                    {mainArticle.title}
                                </h2>
                            </div>
                        </Card>
                    </Link>
                )}
                
                {/* Right Column */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {secondaryArticle && (
                        <Card className="md:col-span-2 bg-accent/30 dark:bg-accent/10 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-sm mb-2 text-muted-foreground">
                                    <span className="font-semibold">{secondaryArticle.tags[0]}</span>
                                </div>
                                <h3 className="text-xl font-bold font-headline mb-2">{secondaryArticle.title}</h3>
                                <div className="text-sm text-muted-foreground line-clamp-3" dangerouslySetInnerHTML={{ __html: secondaryArticle.excerptHtml }}></div>
                            </div>
                            <div className="mt-4 border-t pt-4 space-y-3 text-sm">
                                {linkArticle1 && (
                                    <Link href={`/blog/${linkArticle1.handle}`} className="flex justify-between items-center group">
                                        <span className="group-hover:underline">{linkArticle1.title}</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                )}
                                {linkArticle2 && (
                                    <Link href={`/blog/${linkArticle2.handle}`} className="flex justify-between items-center group">
                                        <span className="group-hover:underline">{linkArticle2.title}</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                )}
                            </div>
                        </Card>
                    )}

                    {tertiaryArticle && (
                        <Link href={`/blog/${tertiaryArticle.handle}`} className="group block">
                            <Card className="h-full w-full overflow-hidden relative aspect-[4/5]">
                                {tertiaryArticle.image && (
                                     <Image
                                        src={tertiaryArticle.image.url}
                                        alt={tertiaryArticle.image.altText || tertiaryArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 p-4 text-white">
                                    <h3 className="font-bold font-headline leading-tight line-clamp-2 group-hover:underline">{tertiaryArticle.title}</h3>
                                </div>
                            </Card>
                        </Link>
                    )}
                    
                    {quaternaryArticle && (
                         <Link href={`/blog/${quaternaryArticle.handle}`} className="group block">
                            <Card className="h-full w-full overflow-hidden relative aspect-[4/5]">
                                {quaternaryArticle.image && (
                                     <Image
                                        src={quaternaryArticle.image.url}
                                        alt={quaternaryArticle.image.altText || quaternaryArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                               <div className="absolute bottom-0 p-4 text-white">
                                    <h3 className="font-bold font-headline leading-tight line-clamp-2 group-hover:underline">{quaternaryArticle.title}</h3>
                                </div>
                            </Card>
                        </Link>
                    )}

                    <Card className="md:col-span-2 bg-secondary/50 p-6">
                        <div className="flex flex-wrap gap-2">
                           {tags.map(tag => (
                               <Link href={`/blog?tag=${encodeURIComponent(tag)}`} key={tag}>
                                   <Badge variant="outline" className="bg-background hover:bg-accent">{tag}</Badge>
                               </Link>
                           ))}
                        </div>
                        <Link href="/blog" className="flex items-center justify-between mt-4 group text-sm font-semibold">
                            <span>View All Categories</span>
                             <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center transition-transform group-hover:translate-x-1">
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </Link>
                    </Card>
                </div>
            </div>
        </section>
    );
}
