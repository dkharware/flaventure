
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import type { FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface BlogSidebarProps {
  tags: string[];
  recentPosts: any[];
}

export function BlogSidebar({ tags, recentPosts }: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <div className="space-y-8 sticky top-28">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-headline font-bold">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              type="search" 
              name="search"
              placeholder="Search articles..." 
              defaultValue={searchParams.get('query') ?? ''}
            />
            <Button type="submit" size="icon" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-headline font-bold">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <Badge variant={searchParams.get('tag') === tag ? 'default' : 'secondary'} className="hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-headline font-bold">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentPosts.map(post => (
                <li key={post.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <Link href={`/blog/${post.handle}`} className="group">
                    <p className="font-semibold group-hover:text-primary transition-colors">{post.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{format(new Date(post.publishedAt), 'PPP')}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
