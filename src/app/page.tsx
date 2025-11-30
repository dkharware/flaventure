
import React, { Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticles, getAllTags } from '@/lib/shopify';
import { BlogTags } from '@/components/BlogTags';
import { Skeleton } from '@/components/ui/skeleton';
import { FeaturedArticles } from '@/components/FeaturedArticles';

const WebStoriesSection = lazy(() => import('@/components/WebStoriesSection'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const FaqSection = lazy(() => import('@/components/FaqSection'));


async function TagsSection() {
    const tags = await getAllTags();
    return (
      <div className="py-8 md:py-12">
        <BlogTags tags={tags} />
      </div>
    );
}

export default async function Home() {
    const { articles } = await getArticles(6);

  return (
    <div className="w-full">
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedArticles articles={articles} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TagsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WebStoriesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <BlogSection />
      </Suspense>
       <Suspense fallback={<SectionSkeleton />}>
        <FaqSection />
      </Suspense>
    </div>
  );
}

const SectionSkeleton = () => (
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
