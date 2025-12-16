
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
                            <CarouselItem key={article.id} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="font-semibold text-white text-base leading-tight drop-shadow-md line-clamp-3">{article.title}</h3>
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
