
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const createPageURL = (params: { after?: string; before?: string }): string => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    
    currentParams.delete('after');
    currentParams.delete('before');

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
    ? createPageURL({ before: pageInfo.startCursor })
    : '#';

  const nextPageUrl = pageInfo.hasNextPage && pageInfo.endCursor
    ? createPageURL({ after: pageInfo.endCursor })
    : '#';

  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <Button asChild variant="outline" disabled={!pageInfo.hasPreviousPage}>
        <Link href={prevPageUrl}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Link>
      </Button>
      <Button asChild variant="outline" disabled={!pageInfo.hasNextPage}>
        <Link href={nextPageUrl}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
