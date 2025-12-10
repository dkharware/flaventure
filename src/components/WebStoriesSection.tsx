
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from '@/components/ui/badge';
import { getArticles } from '@/lib/shopify';
import placeholderArticles from '@/lib/placeholder-articles.json';
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
}


const StoryCard = ({ article }: { article: Article }) => (
    <Link href={article.handle === '#' ? '/blog' : `/blog/${article.handle}`} className="block group">
        <div className="relative aspect-[4/5] w-full h-auto rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
            {article.image && (
                <Image
                src={article.image.url}
                alt={article.image.altText || article.title}
                fill
                className="object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col justify-end h-full">
                <h3 className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-md line-clamp-2">{article.title}</h3>
                <div
                className="text-white/80 text-sm mt-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: article.excerptHtml }}
                />
                <div className="mt-4">
                    <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm border-none">
                    {format(new Date(article.publishedAt), 'PPP')}
                    </Badge>
                </div>
            </div>
        </div>
    </Link>
);


export default function WebStoriesSection() {
    const [articles, setArticles] = useState<Article[]>(placeholderArticles as Article[]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const hasApiKeys = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

        if (!hasApiKeys) {
            setIsLoading(false);
            return;
        }

        const fetchArticles = async () => {
            try {
                const { articles: fetchedArticles } = await getArticles(8);
                if (fetchedArticles.length > 0) {
                     // Shuffle the array
                    const shuffledArticles = fetchedArticles.sort(() => 0.5 - Math.random());
                    setArticles(shuffledArticles);
                }
            } catch (error) {
                console.error("Failed to fetch articles, using placeholders.", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, []);
    
    return (
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                  <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Web Stories</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                      Discover our latest articles in a visual, story-like format.
                  </p>
              </div>
          </div>
          <div className="mx-auto max-w-5xl pt-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {articles.map((article: any) => (
                  <CarouselItem key={article.id} className="basis-2/3 md:basis-1/2 lg:basis-1/3">
                    {isLoading ? (
                        <div className="relative aspect-[4/5] w-full h-auto rounded-xl overflow-hidden">
                            <Skeleton className="h-full w-full" />
                        </div>
                    ) : (
                        <StoryCard article={article} />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="h-8 w-8 bg-foreground text-background -left-4 md:bg-transparent md:text-foreground md:-left-12" />
              <CarouselNext className="h-8 w-8 bg-foreground text-background -right-4 md:bg-transparent md:text-foreground md:-right-12" />
            </Carousel>
          </div>
        </div>
      </section>
    );
}
