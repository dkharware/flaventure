
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllTags, getArticles } from '@/lib/shopify';
import placeholderTags from '@/lib/placeholder-tags.json';
import { Skeleton } from './ui/skeleton';
import { CategoryCard, CategoryCardSkeleton } from './CategoryCard';

interface Tag {
    name: string;
    count: number;
    imageUrl?: string;
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
                    setTags(placeholderTags.map(tag => ({...tag, imageUrl: `https://picsum.photos/seed/${tag.name}/200`})));
                    return;
                }
                
                const fetchedTags = await getAllTags();
                const tagsWithImages = await Promise.all(fetchedTags.map(async (tag: Tag) => {
                    const { articles } = await getArticles(1, `tag:'${tag.name}'`);
                    const imageUrl = articles[0]?.image?.url;
                    return { ...tag, imageUrl };
                }));

                if (tagsWithImages && tagsWithImages.length > 0) {
                    setTags(tagsWithImages);
                } else {
                    setTags(placeholderTags.map(tag => ({...tag, imageUrl: `https://picsum.photos/seed/${tag.name}/200`})));
                }
            } catch (error) {
                console.error("Failed to fetch tags, using placeholders.", error);
                setTags(placeholderTags.map(tag => ({...tag, imageUrl: `https://picsum.photos/seed/${tag.name}/200`})));
            } finally {
                setIsLoading(false);
            }
        }
        fetchTags();
    }, []);

    return (
        <section className="w-full py-8">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Explore Categories</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           Find articles on the topics that interest you most.
                        </p>
                    </div>
                </div>
                <div className="mx-auto pt-8">
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
