
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getArticles } from "@/lib/shopify";
import { Badge } from "./ui/badge";

export async function WebStories() {
    const { articles } = await getArticles(7);

    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Web Stories</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                            Quick, visual guides and insights into the world of e-commerce development.
                        </p>
                    </div>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 2,
                    }}
                    className="w-full max-w-6xl mx-auto pt-8"
                >
                    <CarouselContent>
                        {articles.map((article, index) => (
                            <CarouselItem key={article.id} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/3">
                                <Link href={`/blog/${article.handle}`} className="block group">
                                    <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                                        <Image
                                            src={article.image?.url || `https://picsum.photos/seed/story${index}/300/500`}
                                            alt={article.image?.altText || article.title}
                                            fill
                                            className="object-cover"
                                            data-ai-hint="technology abstract"
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex flex-col justify-end h-full">
                                            <div>
                                                <h3 className="font-bold text-xl leading-tight drop-shadow-md line-clamp-3 mb-2">{article.title}</h3>
                                                <p className="text-sm text-white/90 line-clamp-2" dangerouslySetInnerHTML={{ __html: article.excerptHtml }} />
                                                <Badge variant="secondary" className="mt-4 bg-gray-500/30 text-white/90 border-none">
                                                    {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
        </section>
    );
}
