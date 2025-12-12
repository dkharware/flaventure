
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllTags } from '@/lib/shopify';
import placeholderTags from '@/lib/placeholder-tags.json';
import { Skeleton } from './ui/skeleton';
import { CategoryCard, CategoryCardSkeleton } from './CategoryCard';

interface Tag {
    name: string;
    count: number;
}

export default function CategoriesSection() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasApiKeys = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

        async function fetchTags() {
            setIsLoading(true);
            try {
                if (!hasApiKeys || (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN.includes('your-store-name'))) {
                    setTags(placeholderTags);
                    return;
                }
                
                const fetchedTags = await getAllTags();
                if (fetchedTags && fetchedTags.length > 0) {
                    setTags(fetchedTags);
                } else {
                    setTags(placeholderTags);
                }
            } catch (error) {
                console.error("Failed to fetch tags, using placeholders.", error);
                setTags(placeholderTags);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTags();
    }, []);

    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Explore Categories</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           Find articles on the topics that interest you most.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl pt-8">
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {isLoading ? (
                            Array.from({ length: 12 }).map((_, index) => <CategoryCardSkeleton key={index} />)
                        ) : (
                            tags.slice(0, 12).map((tag, index) => (
                               <CategoryCard key={index} tag={tag} index={index} />
                            ))
                        )}
                   </div>
                </div>
            </div>
        </section>
    );
}
