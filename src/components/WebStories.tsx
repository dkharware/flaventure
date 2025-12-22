
'use client';

import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useEffect, useState, useRef, useCallback } from 'react';
import { getArticles } from '@/lib/shopify';
import { Skeleton } from "./ui/skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

interface Article {
  id: string;
  handle: string;
  title: string;
  excerptHtml: string;
  publishedAt: string;
  image?: { url: string; altText: string };
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string | null;
}

export function WebStories() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initialLoad = async () => {
            setIsLoading(true);
            const { articles: initialArticles, pageInfo: initialPageInfo } = await getArticles(7, undefined, {}, false);
            setArticles(initialArticles);
            setPageInfo(initialPageInfo);
            setIsLoading(false);
        };
        initialLoad();
    }, []);

    if (isLoading && articles.length === 0) {
        return (
            <section className="w-full py-8 md:py-12">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <Skeleton className="h-10 w-1/3" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                    <div className="w-full max-w-6xl mx-auto pt-8 flex gap-4 overflow-hidden">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex-shrink-0 w-full sm:w-1/3 md:w-1/4 lg:w-1/4">
                            <Skeleton className="h-[350px] w-full rounded-xl" />
                        </div>
                      ))}
                    </div>
                </div>
            </section>
        );
    }
    
    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-8 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Latest Stories</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                            Quick, visual stories and dispatches from our latest food and travel adventures.
                        </p>
                    </div>
                </div>

                <div className="relative pt-8">
                    <Carousel
                        opts={{
                            align: "start",
                            dragFree: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {articles.map((article, index) => (
                                <CarouselItem key={`${article.id}-${index}`} className="pl-2 md:pl-4 basis-[80vw] sm:basis-1/3 md:basis-1/4">
                                    <Link href={`/blog/${article.handle}`} className="block group h-full p-px">
                                        <div className="relative h-[350px] w-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                                            <Image
                                                src={article.image?.url || `https://picsum.photos/seed/story${index}/300/500`}
                                                alt={article.image?.altText || article.title}
                                                fill
                                                className="object-cover"
                                                data-ai-hint="travel food"
                                                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                                                priority={index < 4}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex flex-col justify-end h-full">
                                                <div>
                                                    <h3 className="font-bold text-lg leading-tight drop-shadow-md line-clamp-3 mb-2">{article.title}</h3>
                                                    <Badge variant="secondary" className="mt-2 bg-gray-500/30 text-white/90 border-none">
                                                        <ClientOnlyDate dateString={article.publishedAt} options={{ month: 'long', day: 'numeric' }} />
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                         <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

// Add ClientOnlyDate to avoid hydration errors
function ClientOnlyDate({ dateString, options }: { dateString: string, options?: Intl.DateTimeFormatOptions }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
      setFormattedDate(
          new Date(dateString).toLocaleDateString('en-US', options)
      );
  }, [dateString, options]);

  if (!formattedDate) {
      return null;
  }

  return <>{formattedDate}</>;
}
