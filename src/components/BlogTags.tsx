
'use client';

import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface BlogTagsProps {
    tags: string[];
}

const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500',
];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: string[]) => {
    let currentIndex = array.length, randomIndex;
    const newArray = [...array];
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
};


export function BlogTags({ tags }: BlogTagsProps) {
    const [shuffledTags, setShuffledTags] = useState<string[]>([]);

    useEffect(() => {
        setShuffledTags(shuffleArray(tags));
    }, [tags]);

    if (!shuffledTags || shuffledTags.length === 0) {
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
                            {shuffledTags.map((tag, index) => (
                                <CarouselItem key={tag} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                                    <Link href={`/blog?tag=${encodeURIComponent(tag)}`} className="block group">
                                        <div className={cn(
                                            "relative aspect-[3/1] w-full rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 flex items-center justify-center",
                                            colors[index % colors.length]
                                        )}>
                                            <h3 className="text-white font-semibold text-lg drop-shadow-md">#{tag}</h3>
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
