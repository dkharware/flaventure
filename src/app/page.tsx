
import React, { Suspense, lazy } from 'react';
import { getArticles } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { FeaturedArticles } from '@/components/FeaturedArticles';
import { BlogSearch } from '@/components/BlogSearch';

const WebStoriesSection = lazy(() => import('@/components/WebStoriesSection'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const FaqSection = lazy(() => import('@/components/FaqSection'));


export default async function Home() {
    const { articles } = await getArticles(5);
    const { articles: popularArticles } = await getArticles(4, `(tag:'popular' OR tag:'featured')`);


  return (
    <div className="w-full">
      <section className="w-full">
        <div className="container mx-auto py-8 px-3 md:py-12 md:px-6">
          <div className="relative overflow-hidden p-8 my-8 text-center bg-black bg-grid-black rounded-lg">
              <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[150%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary))_0%,_transparent_50%)] animate-float z-0"></div>
              <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[150%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent))_0%,_transparent_50%)] animate-float animation-delay-[-5s] z-0"></div>
              <div className="relative z-10">
                  <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-6xl text-white">Explore Articles & Guides</h1>
                  <p className="text-lg text-white/80 mt-2 max-w-2xl mx-auto">Your go-to resource for in-depth tutorials, expert insights, and the latest trends in e-commerce development.</p>
                  <div className="mt-6 max-w-xl mx-auto">
                    <BlogSearch />
                  </div>
              </div>
          </div>
        </div>
      </section>

      <section className="container py-8 md:py-12">
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedArticles articles={articles} popularArticles={popularArticles} />
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
            <div className="lg:col-span-2 space-y-8">
                <div className="h-full overflow-hidden rounded-lg bg-card p-6 flex flex-col md:flex-row gap-6">
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

            <div className="lg:col-span-1 space-y-4">
                <h2 className="font-bold font-headline text-lg"><Skeleton className="h-8 w-1/3" /></h2>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-4 items-start border-b border-border/20 pb-4">
                        <div className='w-1/3'>
                            <Skeleton className="w-20 h-16 aspect-square rounded-lg flex-shrink-0" />
                        </div>
                        <div className="flex flex-col flex-grow space-y-2 w-2/3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
