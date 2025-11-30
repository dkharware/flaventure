
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
import { Badge } from './ui/badge';

interface Tag {
    name: string;
    count: number;
}
interface BlogTagsProps {
    tags: Tag[];
}

export function BlogTags({ tags }: BlogTagsProps) {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-4 border-b bg-background">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-7xl">
                    <Carousel
                        opts={{
                            align: "start",
                            dragFree: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2">
                            {tags.map((tag, index) => (
                                <CarouselItem key={tag.name} className="basis-auto pl-2">
                                    <Link href={`/blog?tag=${encodeURIComponent(tag.name)}`} className="block group">
                                         <Badge variant="outline" className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                            #{tag.name}
                                         </Badge>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
