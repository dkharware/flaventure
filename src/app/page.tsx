
import React, { Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArticles, getAllTags } from '@/lib/shopify';
import { format } from 'date-fns';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from '@/components/ui/badge';
import { Hero } from '@/components/Hero';
import { BlogTags } from '@/components/BlogTags';
import { Skeleton } from '@/components/ui/skeleton';

const WebStoriesSection = lazy(() => import('@/components/WebStoriesSection'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const FaqSection = lazy(() => import('@/components/FaqSection'));


async function TagsSection() {
    const tags = await getAllTags();
    return (
      <div>
        <BlogTags tags={tags} />
      </div>
    );
}

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <TagsSection />
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
    <div className="w-full py-12 md:py-24 lg:py-32">
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
