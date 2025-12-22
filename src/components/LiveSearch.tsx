
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getArticleSuggestions } from '@/lib/shopify';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Article {
  handle: string;
  title: string;
}

interface LiveSearchProps {
  query: string;
  onClose: () => void;
  className?: string;
}

export function LiveSearch({ query, onClose, className }: LiveSearchProps) {
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const suggestions = await getArticleSuggestions(searchTerm);
      setResults(suggestions);
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  const handleLinkClick = () => {
    onClose();
  };

  const handleViewAllClick = () => {
    onClose();
    router.push(`/blog?query=${encodeURIComponent(query)}`);
  }

  if (!query) return null;

  return (
    <Card className={cn("absolute top-full mt-2 w-full shadow-lg z-50", className)}>
      <CardContent className="p-2">
        <div className="max-h-80 overflow-y-auto">
          {isLoading && (
            <div className="space-y-2 p-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}
          {!isLoading && results.length > 0 && (
            <ul className="divide-y">
              {results.map((article) => (
                <li key={article.handle}>
                  <Link
                    href={`/blog/${article.handle}`}
                    onClick={handleLinkClick}
                    className="block p-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-md"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!isLoading && results.length === 0 && query.length > 1 && (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No results found.
            </p>
          )}
        </div>
        {results.length > 0 && (
            <div className="p-2 border-t mt-1">
                 <Button 
                    variant="ghost" 
                    className="w-full justify-center text-sm"
                    onClick={handleViewAllClick}
                 >
                    View all results <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
