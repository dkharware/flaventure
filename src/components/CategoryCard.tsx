
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
    const imageUrl = `https://picsum.photos/seed/${tag.name.toLowerCase()}${index}/200/200`;
    const aiHint = getAiHintForTag(tag.name);

    return (
        <Link href={`/blog?tag=${encodeURIComponent(tag.name)}`} className="block group">
            <div className="space-y-2 text-center">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src={imageUrl}
                        alt={`Image for ${tag.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={aiHint}
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
