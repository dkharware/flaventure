
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import type { FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import { GoogleAd } from './GoogleAd';
import { OtieAdBanner } from './OtieAdBanner';


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
interface BlogSidebarProps {
    tags: Tag[];
    recentPosts: Article[];
}

export function BlogSidebar({ tags, recentPosts }: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isLoading = !tags || !recentPosts;
  
  const isFilterActive = searchParams.has('query') || searchParams.has('tag');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search') as string;
    if (searchQuery) {
        router.push(`/blog?query=${encodeURIComponent(searchQuery)}`);
    } else {
        router.push('/blog');
    }
  };

  const clearFilters = () => {
    router.push('/blog');
  };

  return (
    <div className="space-y-8 sticky top-28">
      <Card className="bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              type="search" 
              name="search"
              placeholder="Search articles..." 
              defaultValue={searchParams.get('query') ?? ''}
              aria-label="Search articles"
            />
            <Button type="submit" size="icon" variant="outline" aria-label="Submit search">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          {isFilterActive && (
            <Button variant="ghost" className="w-full justify-start px-2 mt-2 text-sm text-muted-foreground" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" /> Clear filter
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Popular Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <ul className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                  <Skeleton className="h-14 w-14 rounded-md" />
                  <div className="flex-grow space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            recentPosts.length > 0 && (
              <ul className="space-y-4">
                {recentPosts.map(post => (
                  <li key={post.id} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/blog/${post.handle}`} className="group flex items-start gap-4">
                      {post.image && (
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image 
                            src={post.image.url}
                            alt={post.image.altText || post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <p className="font-semibold group-hover:text-primary transition-colors line-clamp-2 text-sm">{post.title}</p>
                        {post.readTime && post.viewCount && (
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            <span>{post.readTime} min read</span>
                            <span>&bull;</span>
                            <span>{post.viewCount.toLocaleString()} views</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )
          )}
        </CardContent>
      </Card>

       <OtieAdBanner className="bg-background/50 backdrop-blur-lg p-0" />

      <Card className="bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          ) : (
            tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Link key={tag.name} href={`/blog?tag=${encodeURIComponent(tag.name)}`}>
                    <Badge variant={searchParams.get('tag') === tag.name ? 'default' : 'secondary'} className="hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
                      {tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            )
          )}
        </CardContent>
      </Card>

    </div>
  );
}
