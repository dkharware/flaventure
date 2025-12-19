
'use client';

import { Suspense } from 'react';
import { BlogSidebar } from './BlogSidebar';
import { Skeleton } from './ui/skeleton';

export function SidebarWrapper() {
    return (
        <div className="lg:sticky lg:top-28">
            <Suspense fallback={
                <div className="space-y-8">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            }>
                <BlogSidebar />
            </Suspense>
        </div>
    );
}
