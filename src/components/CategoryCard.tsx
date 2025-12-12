
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

interface Tag {
    name: string;
    imageUrl?: string;
}

interface CategoryCardProps {
    tag: Tag;
    index: number;
}

const getAiHintForTag = (tagName: string): string => {
    const lowerCaseTag = tagName.toLowerCase();
    if (lowerCaseTag.includes('shopify')) return 'ecommerce store';
    if (lowerCaseTag.includes('headless')) return 'code architecture';
    if (lowerCaseTag.includes('theme')) return 'design layout';
    if (lowerCaseTag.includes('api')) return 'data connection';
    if (lowerCaseTag.includes('next.js')) return 'framework';
    if (lowerCaseTag.includes('performance')) return 'speed dashboard';
    if (lowerCaseTag.includes('webflow')) return 'web design';
    return 'technology abstract'; // fallback
}

export function CategoryCard({ tag, index }: CategoryCardProps) {
    const imageUrl = tag.imageUrl || `https://picsum.photos/seed/${tag.name.toLowerCase()}${index}/150/150`;
    const aiHint = getAiHintForTag(tag.name);

    return (
        <Link href={`/blog?tag=${encodeURIComponent(tag.name)}`} className="block group">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Image
                    src={imageUrl}
                    alt={`Image for ${tag.name}`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    data-ai-hint={aiHint}
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 12.5vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="bg-white/10 backdrop-blur-sm py-1.5 px-4 rounded-full border border-white/20">
                         <p className="font-semibold text-xs md:text-sm text-white text-center">{tag.name}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}


export const CategoryCardSkeleton = () => (
    <div className="space-y-2 text-center">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
    </div>
)
