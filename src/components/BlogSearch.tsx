
'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogSearchProps {
  initialQuery?: string;
  className?: string;
}

export function BlogSearch({ initialQuery = '', className }: BlogSearchProps) {
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
    <form onSubmit={handleSearch} className={cn("relative w-full", className)}>
      <Input 
        type="search" 
        name="search"
        placeholder="Search anything you are looking for" 
        defaultValue={initialQuery}
        className="h-14 text-base bg-background/80 rounded-full pl-12 pr-16 shadow-lg"
        aria-label="Search articles"
      />
       <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground" />
       </div>
      <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" aria-label="Submit search">
        <ArrowRight className="h-5 w-5" />
      </Button>
    </form>
  );
}
