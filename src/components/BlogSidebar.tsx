
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import type { FormEvent } from 'react';

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
      {/* Search Bar */}
      <div>
        <h3 className="text-xl font-headline font-bold mb-4">Search</h3>
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
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-xl font-headline font-bold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant={searchParams.get('tag') === tag ? 'default' : 'secondary'} className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div>
          <h3 className="text-xl font-headline font-bold mb-4">Recent Posts</h3>
          <ul className="space-y-4">
            {recentPosts.map(post => (
              <li key={post.id}>
                <Link href={`/blog/${post.handle}`} className="group">
                  <p className="font-semibold group-hover:text-primary transition-colors">{post.title}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(post.publishedAt), 'PPP')}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
