
import React, { Suspense } from 'react';
import { getArticles } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { NewsletterCard } from '@/components/NewsletterCard';
import { FeaturedArticles } from '@/components/FeaturedArticles';
import SpotlightBlogs from '@/components/SpotlightBlogs';
import WebStoriesSection from '@/components/WebStoriesSection';
import FaqSection from '@/components/FaqSection';
import CategoriesSection from '@/components/CategoriesSection';
import { BlogSearch } from '@/components/BlogSearch';

export default async function Home() {
    const { articles } = await getArticles(9);

  return (
    <div className="w-full">
      <section className="relative w-full overflow-hidden hero-grid-bg">
        <div className="container mx-auto py-24 px-3 md:py-32 md:px-6 text-center">
            
            <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-6xl md:text-7xl">Hey, We're storedevguide. See our thoughts, stories and ideas.</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Welcome! Thought-provoking articles, inspiring stories, and expert insights across industries and interests.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <BlogSearch />
            </div>
        </div>
      </section>

      <Suspense fallback={<SectionSkeleton />}>
        <div className="py-16 md:py-24 space-y-16 md:space-y-24">
            <FeaturedArticles articles={articles} />
            <CategoriesSection />
            <SpotlightBlogs />
            <WebStoriesSection />
            <FaqSection />
        </div>
      </Suspense>
    </div>
  );
}


const SectionSkeleton = () => (
    <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <div className="flex gap-4">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/4" />
                </div>
                <Skeleton className="h-12 w-1/3" />
            </div>
        </div>
         <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
                <Skeleton className="h-56 w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
            </div>
             <div className="space-y-3">
                <Skeleton className="h-56 w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
            </div>
             <div className="space-y-3">
                <Skeleton className="h-56 w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
            </div>
         </div>
    </section>
);

