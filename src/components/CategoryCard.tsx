
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

interface Tag {
    name: string;
}

interface CategoryCardProps {
    tag: Tag;
    index: number;
}

export function CategoryCard({ tag, index }: CategoryCardProps) {
    const imageUrl = `https://picsum.photos/seed/${tag.name.toLowerCase()}${index}/200/200`;

    return (
        <Link href={`/blog?tag=${encodeURIComponent(tag.name)}`} className="block group">
            <div className="space-y-2 text-center">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src={imageUrl}
                        alt={`Image for ${tag.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint="abstract"
                    />
                </div>
                <p className="font-semibold text-sm group-hover:text-primary transition-colors">{tag.name}</p>
            </div>
        </Link>
    );
}


export const CategoryCardSkeleton = () => (
    <div className="space-y-2 text-center">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <Skeleton className="h-5 w-3/4 mx-auto" />
    </div>
)
