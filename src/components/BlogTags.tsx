
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { slugify } from '@/lib/utils';

interface BlogTagsProps {
    tags: string[];
}

export function BlogTags({ tags }: BlogTagsProps) {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Explore Topics</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                            Find articles based on the topics that interest you most.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-6xl pt-12">
                    <Carousel
                        opts={{
                            align: "start",
                            dragFree: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {tags.map((tag, index) => (
                                <CarouselItem key={tag} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                                    <Link href={`/blog?tag=${encodeURIComponent(tag)}`} className="block group">
                                        <div className="relative aspect-[3/1] w-full rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                                            <Image
                                                src={`https://picsum.photos/seed/${slugify(tag)}/400/200`}
                                                alt={`Image for tag ${tag}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <h3 className="text-white font-semibold text-lg drop-shadow-md">#{tag}</h3>
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
