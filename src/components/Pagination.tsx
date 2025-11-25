
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
  currentPage: number;
}

export function Pagination({ pageInfo, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageURL = (params: { after?: string; before?: string, page: number }): string => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    
    currentParams.delete('after');
    currentParams.delete('before');
    currentParams.set('page', params.page.toString());

    if (params.after) {
      currentParams.set('after', params.after);
    }
    if (params.before) {
      currentParams.set('before', params.before);
    }
    
    const queryString = currentParams.toString();
    return `/blog${queryString ? `?${queryString}` : ''}`;
  };

  const prevPageUrl = pageInfo.hasPreviousPage && pageInfo.startCursor
    ? createPageURL({ before: pageInfo.startCursor, page: currentPage - 1 })
    : '#';

  const nextPageUrl = pageInfo.hasNextPage && pageInfo.endCursor
    ? createPageURL({ after: pageInfo.endCursor, page: currentPage + 1 })
    : '#';

  const canShowPrevious = currentPage > 1;

  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <Button asChild variant="outline" disabled={!canShowPrevious}>
        <Link href={prevPageUrl}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Link>
      </Button>

      <span className="text-sm font-medium text-muted-foreground">
        Page {currentPage}
      </span>

      <Button asChild variant="outline" disabled={!pageInfo.hasNextPage}>
        <Link href={nextPageUrl}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
