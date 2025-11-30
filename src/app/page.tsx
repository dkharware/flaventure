
import React, { Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { FeaturedArticles } from '@/components/FeaturedArticles';

const WebStoriesSection = lazy(() => import('@/components/WebStoriesSection'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const FaqSection = lazy(() => import('@/components/FaqSection'));


export default async function Home() {
    const { articles } = await getArticles(5);

  return (
    <div className="w-full">
      <section className="container py-8 md:py-12">
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedArticles articles={articles} />
        </Suspense>
      </section>

      <Suspense fallback={<GenericSkeleton />}>
        <WebStoriesSection />
      </Suspense>
      <Suspense fallback={<GenericSkeleton />}>
        <BlogSection />
      </Suspense>
       <Suspense fallback={<GenericSkeleton />}>
        <FaqSection />
      </Suspense>
    </div>
  );
}

const GenericSkeleton = () => (
    <div className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-2/3" />
            </div>
            <div className="mx-auto max-w-5xl pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
            </div>
        </div>
    </div>
);

const SectionSkeleton = () => (
    <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
            {/* Left Side Skeleton */}
            <div className="lg:col-span-2 space-y-8">
                {/* Large Hero Card Skeleton */}
                <div className="h-full overflow-hidden rounded-lg bg-muted/20 p-6 flex flex-col md:flex-row gap-6">
                    <Skeleton className="relative w-full md:w-1/2 aspect-[16/9] rounded-lg" />
                    <div className="flex flex-col flex-grow p-1 md:w-1/2 space-y-4">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-10 w-1/2" />
                    </div>
                </div>
            </div>

            {/* Right Side Skeleton */}
            <div className="lg:col-span-1 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-4 items-center border-b pb-4">
                        <Skeleton className="w-20 h-20 aspect-square rounded-lg flex-shrink-0" />
                        <div className="flex flex-col flex-grow space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
