
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import CategoriesSection from '@/components/CategoriesSection';
import { BlogSearch } from '@/components/BlogSearch';
import { WhatsappBanner } from '@/components/WhatsappBanner';
import { PromoSection } from '@/components/PromoSection';
import { RecentPosts } from '@/components/RecentPosts';
import { WebStories } from '@/components/WebStories';
import FaqSection from '@/components/FaqSection';

export default async function Home() {

  return (
    <div className="w-full">
      <WhatsappBanner />
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
          <Suspense fallback={<WebStoriesSkeleton />}>
            <WebStories />
          </Suspense>
          <CategoriesSection />
          <Suspense fallback={<RecentPostsSkeleton />}>
            <RecentPosts />
          </Suspense>
          <PromoSection />
          <FaqSection />
      </div>
    </div>
  );
}

const RecentPostsSkeleton = () => (
    <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 pt-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
            </div>
        </div>
    </section>
);

const WebStoriesSkeleton = () => (
    <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="w-full max-w-6xl mx-auto pt-8 flex gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-[400px] w-full basis-1/5 rounded-xl" />
              ))}
            </div>
        </div>
    </section>
);
