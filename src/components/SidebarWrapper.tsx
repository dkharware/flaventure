
'use client';

import { Suspense } from 'react';
import { BlogSidebar } from './BlogSidebar';
import { Skeleton } from './ui/skeleton';

interface Tag {
  name: string;
  count: number;
}
interface Article {
  id: string;
  handle: string;
  title: string;
  image?: { url: string; altText: string };
  readTime?: number;
  viewCount?: number;
}

interface SidebarWrapperProps {
    tags: Tag[];
    recentPosts: Article[];
}

export function SidebarWrapper({ tags, recentPosts }: SidebarWrapperProps) {
    return (
        <div className="lg:sticky lg:top-28">
            <Suspense fallback={
                <div className="space-y-8">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            }>
                <BlogSidebar tags={tags} recentPosts={recentPosts} />
            </Suspense>
        </div>
    );
}
