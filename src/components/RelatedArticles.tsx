
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRelatedArticles } from '@/lib/shopify';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

interface RelatedArticlesProps {
    currentArticleHandle: string;
    tags: string[];
}

export default async function RelatedArticles({ currentArticleHandle, tags }: RelatedArticlesProps) {
    const articles = await getRelatedArticles(currentArticleHandle, tags);

    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <div className="mt-16 pt-12 border-t border-border/10">
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">Related Articles</h2>
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 1,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {articles.map((related) => (
                        <CarouselItem key={related.id} className="md:basis-1/2 lg:basis-1/4">
                            <div className="p-1">
                                <Link href={`/blog/${related.handle}`} className="block group h-full">
                                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        {related.image && (
                                            <div className="relative h-40 w-full overflow-hidden">
                                                <Image src={related.image.url} alt={related.image.altText || related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                                                    {related.tags?.slice(0, 2).map((tag: string) => (
                                                        <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <CardHeader className="flex-grow">
                                            <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors line-clamp-2">{related.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-xs text-muted-foreground">{new Date(related.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
    );
}
