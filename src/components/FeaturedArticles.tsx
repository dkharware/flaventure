
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowRight, ArrowUpRight, Plus, ExternalLink } from 'lucide-react';
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
    ] = articles;

    if (articles.length < 2) {
        return <div className="container py-12 text-center">Not enough articles to display this section.</div>
    }

    return (
        <section className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                {mainArticle && (
                    <Link href={`/blog/${mainArticle.handle}`} className="group block lg:col-span-2">
                        <Card className="h-full w-full overflow-hidden relative aspect-video">
                            {mainArticle.image && (
                                <Image
                                    src={mainArticle.image.url}
                                    alt={mainArticle.image.altText || mainArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                            
                            <div className="absolute top-4 left-4 flex gap-2">
                                <Badge variant="secondary" className="bg-white/30 backdrop-blur-sm text-white border-0">{format(new Date(mainArticle.publishedAt), 'dd MMM, yyyy')}</Badge>
                                {mainArticle.tags[0] && <Badge variant="secondary" className="bg-white/30 backdrop-blur-sm text-white border-0">&bull; {mainArticle.tags[0]}</Badge>}
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h2 className="text-2xl font-bold font-headline text-white drop-shadow-lg line-clamp-2">
                                    {mainArticle.title}
                                </h2>
                            </div>
                            <div className="absolute top-4 right-4 p-2 bg-white/30 backdrop-blur-sm rounded-full">
                                <ExternalLink className="h-5 w-5 text-white" />
                            </div>

                        </Card>
                    </Link>
                )}
                
                {/* Right Column */}
                <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-teal-100 dark:bg-teal-900/40 p-6 flex flex-col justify-between border-0 relative">
                       <div className="flex justify-between items-center mb-4">
                           <Badge variant="secondary" className="bg-black/10 dark:bg-white/10 border-0">&bull; Featured</Badge>
                           <div className="h-8 w-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center">
                               <Plus className="h-4 w-4" />
                           </div>
                       </div>
                        <div>
                            <p className="font-semibold">Tutorial</p>
                            <h3 className="text-xl font-bold font-headline mb-2">Shopify Storefront &amp; Admin API Guide</h3>
                        </div>
                        <Link href="/tutorials/shopify-api-guide" className="text-sm font-medium underline flex items-center gap-1">
                            Read the guide <ArrowRight className="h-3 w-3" />
                        </Link>
                    </Card>

                    {secondaryArticle && (
                        <Link href={`/blog/${secondaryArticle.handle}`} className="group block">
                            <Card className="h-full w-full overflow-hidden relative aspect-square">
                                {secondaryArticle.image && (
                                     <Image
                                        src={secondaryArticle.image.url}
                                        alt={secondaryArticle.image.altText || secondaryArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                               <div className="absolute bottom-0 p-4">
                                    <Button asChild size="pill">
                                        <span>
                                            See all picks
                                            <div className="ml-2 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </span>
                                    </Button>
                                </div>
                            </Card>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
