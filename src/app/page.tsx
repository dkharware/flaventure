
import React, { Suspense, lazy } from 'react';
import { getArticles } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { NewsletterCard } from '@/components/NewsletterCard';
import { FeaturedArticles } from '@/components/FeaturedArticles';
import SpotlightBlogs from '@/components/SpotlightBlogs';
import WebStoriesSection from '@/components/WebStoriesSection';
import CategoriesSection from '@/components/CategoriesSection';
import { BlogSearch } from '@/components/BlogSearch';

const FaqSection = lazy(() => import('@/components/FaqSection'));

export default async function Home() {
    // Fetch a larger batch of articles to distribute among sections
    const { articles } = await getArticles(20);

    const featuredArticles = articles.slice(0, 5); // 1 for hero, 4 for popular
    const spotlightArticles = articles.slice(5, 11); // Next 6
    const webStoryArticles = articles.slice(11, 19); // Next 8

  return (
    <div className="w-full">
      <section className="relative w-full overflow-hidden hero-gradient-bg hero-grid-bg">
        <div className="container mx-auto py-24 px-3 md:py-32 md:px-6 text-center">
            
            <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-6xl md:text-7xl animate-text-gradient">Hey, We're storedevguide. See our thoughts, stories and ideas.</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Welcome! Thought-provoking articles, inspiring stories, and expert insights across industries and interests.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <BlogSearch />
            </div>
        </div>
      </section>

      <div className="py-16 md:py-24 space-y-16 md:space-y-24">
          <Suspense fallback={<SectionSkeleton />}>
            <FeaturedArticles articles={featuredArticles} />
          </Suspense>
          <CategoriesSection />
          <Suspense>
            <SpotlightBlogs articles={spotlightArticles} />
          </Suspense>
          <Suspense>
            <WebStoriesSection articles={webStoryArticles} />
          </Suspense>
          <Suspense fallback={<FaqSkeleton />}>
            <FaqSection />
          </Suspense>
      </div>
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

const FaqSkeleton = () => (
  <section className="w-full py-12 md:py-16">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="mx-auto max-w-4xl pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
        <div className="md:col-span-2 space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  </section>
);
