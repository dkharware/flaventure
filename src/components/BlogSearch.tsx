
'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  initialQuery?: string;
}

export function BlogSearch({ initialQuery = '' }: BlogSearchProps) {
  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search') as string;
    if (searchQuery.trim()) {
        router.push(`/blog?query=${encodeURIComponent(searchQuery)}`);
    } else {
        router.push('/blog');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full">
      <Input 
        type="search" 
        name="search"
        placeholder="Search for articles, guides, and tutorials..." 
        defaultValue={initialQuery}
        className="h-12 text-base bg-background/80"
        aria-label="Search articles"
      />
      <Button type="submit" size="lg" aria-label="Submit search">
        <Search className="h-5 w-5 mr-2" />
        Search
      </Button>
    </form>
  );
}
