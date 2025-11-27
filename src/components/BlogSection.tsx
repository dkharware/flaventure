
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArticles } from '@/lib/shopify';
import { format } from 'date-fns';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

export default function BlogSection() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const { articles: fetchedArticles } = await getArticles(9);
            setArticles(fetchedArticles);
        };
        fetchArticles();
    }, []);

    if (articles.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Latest Articles</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           Stay up to date with the latest news, tips, and insights.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-5xl pt-12">
                   <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        {articles.map((article: any) => (
                           <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                             <Link href={`/blog/${article.handle}`} className="block group h-full">
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
                           </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="h-8 w-8 bg-foreground text-background -left-4 md:bg-transparent md:text-foreground md:-left-12" />
                      <CarouselNext className="h-8 w-8 bg-foreground text-background -right-4 md:bg-transparent md:text-foreground md:-right-12" />
                    </Carousel>
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
