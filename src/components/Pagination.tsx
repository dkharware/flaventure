
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}

interface PaginationProps {
  pageInfo: PageInfo;
}

export function Pagination({ pageInfo }: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const createPageURL = (cursor: string, direction: 'before' | 'after'): string => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    
    currentParams.delete('after');
    currentParams.delete('before');
    
    if (direction === 'after') {
      currentParams.set('after', cursor);
      currentParams.set('page', String(currentPage + 1));
    } else if (direction === 'before') {
      currentParams.set('before', cursor);
      currentParams.set('page', String(currentPage - 1));
    }
    
    const queryString = currentParams.toString();
    return `/blog${queryString ? `?${queryString}` : ''}`;
  };

  const prevPageUrl = pageInfo.hasPreviousPage && pageInfo.startCursor
    ? createPageURL(pageInfo.startCursor, 'before')
    : '#';

  const nextPageUrl = pageInfo.hasNextPage && pageInfo.endCursor
    ? createPageURL(pageInfo.endCursor, 'after')
    : '#';

  if (!pageInfo.hasNextPage && !pageInfo.hasPreviousPage) {
    return null;
  }
  
  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <Button asChild variant="outline" disabled={!pageInfo.hasPreviousPage}>
        <Link href={prevPageUrl} aria-disabled={!pageInfo.hasPreviousPage}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Link>
      </Button>

      {currentPage > 0 && 
        <span className="text-sm font-medium text-muted-foreground">
          Page {currentPage}
        </span>
      }

      <Button asChild variant="outline" disabled={!pageInfo.hasNextPage}>
        <Link href={nextPageUrl} aria-disabled={!pageInfo.hasNextPage}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
