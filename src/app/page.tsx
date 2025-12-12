
import React, { Suspense } from 'react';
import { getArticles } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { NewsletterCard } from '@/components/NewsletterCard';
import { FeaturedArticles } from '@/components/FeaturedArticles';
import BlogSection from '@/components/BlogSection';
import WebStoriesSection from '@/components/WebStoriesSection';
import FaqSection from '@/components/FaqSection';

const CategoryBubble = ({ name, position }: { name: string, position: string }) => (
  <div className={`absolute ${position} hidden lg:block`}>
    <div className="relative w-28 h-28">
      <div className="absolute inset-0 bg-white/50 rounded-full blur-xl"></div>
      <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center text-center p-2 shadow-lg">
        <span className="text-sm font-medium text-center">{name}</span>
      </div>
    </div>
  </div>
);

export default async function Home() {
    const { articles } = await getArticles(9);

  return (
    <div className="w-full">
      <section className="relative w-full overflow-hidden hero-grid-bg bg-info">
        <div className="container mx-auto py-24 px-3 md:py-32 md:px-6 text-center">
            
            <CategoryBubble name="AI Tool" position="top-1/4 left-[10%]" />
            <CategoryBubble name="Technology" position="top-1/2 left-[5%]" />
            <CategoryBubble name="Foods" position="bottom-1/4 left-[12%]" />

            <CategoryBubble name="Play" position="top-1/4 right-[10%]" />
            <CategoryBubble name="AI Intelligence" position="top-1/2 right-[5%]" />
            <CategoryBubble name="Lifestyle" position="bottom-1/4 right-[12%]" />

            <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-7xl md:text-8xl">Discover Latest Articles</h1>
            <div className="mt-12 max-w-xl mx-auto">
              <NewsletterCard />
            </div>
        </div>
      </section>

      <Suspense fallback={<SectionSkeleton />}>
        <div className="py-16 md:py-24 space-y-16 md:space-y-24">
            <FeaturedArticles articles={articles} />
            <BlogSection />
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
