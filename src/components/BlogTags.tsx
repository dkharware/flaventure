
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

interface Tag {
    name: string;
    count: number;
}
interface BlogTagsProps {
    tags: Tag[];
}

const gradients = [
    'bg-gradient-to-br from-purple-200 to-indigo-300',
    'bg-gradient-to-br from-green-200 to-blue-300',
    'bg-gradient-to-br from-pink-200 to-rose-300',
    'bg-gradient-to-br from-orange-200 to-red-300',
    'bg-gradient-to-br from-teal-200 to-cyan-300',
    'bg-gradient-to-br from-yellow-200 to-amber-300',
    'bg-gradient-to-br from-lime-200 to-green-300',
    'bg-gradient-to-br from-fuchsia-200 to-pink-300',
];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Tag[]) => {
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
    const [shuffledTags, setShuffledTags] = useState<Tag[]>([]);

    useEffect(() => {
        setShuffledTags(shuffleArray(tags));
    }, [tags]);

    if (!shuffledTags || shuffledTags.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-8">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-6xl">
                    <Carousel
                        opts={{
                            align: "start",
                            dragFree: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {shuffledTags.map((tag, index) => (
                                <CarouselItem key={tag.name} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                                    <Link href={`/blog?tag=${encodeURIComponent(tag.name)}`} className="block group">
                                        <div className={cn(
                                            "relative aspect-[3/1] w-full rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 flex items-center justify-center p-2",
                                            gradients[index % gradients.length]
                                        )}>
                                            <h3 className="text-foreground font-semibold text-base md:text-lg drop-shadow-sm text-center">#{tag.name} ({tag.count})</h3>
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
