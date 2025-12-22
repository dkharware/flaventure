
'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogSearchProps {
  initialQuery?: string;
  className?: string;
  isLive?: boolean;
  onSearch?: (query: string) => void;
}

export function BlogSearch({ initialQuery = '', className, isLive = false, onSearch }: BlogSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLive && onSearch) {
        onSearch(query);
    } else {
        const searchPath = query.trim() ? `/blog?query=${encodeURIComponent(query)}` : '/blog';
        router.push(searchPath);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;
      setQuery(newQuery);
      if (isLive && onSearch) {
          onSearch(newQuery);
      }
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative w-full", className)}>
      <Input 
        type="search" 
        name="search"
        placeholder="Search for destinations, recipes, stories..." 
        value={query}
        onChange={handleChange}
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
