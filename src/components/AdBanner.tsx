
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export function AdBanner() {
  return (
    <Card className="bg-background/50 backdrop-blur-lg group">
      <CardHeader className='pb-4'>
        <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
          <span>Advertisement</span>
          <ExternalLink className="h-3 w-3" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <Link href="https://otieu.com/4/10313318" target="_blank" rel="noopener noreferrer sponsored" className="block overflow-hidden rounded-md">
          <div className="relative aspect-[300/250] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="https://picsum.photos/seed/adbanner/300/250"
              alt="Advertisement"
              fill
              className="object-cover"
              data-ai-hint="product advertisement"
              sizes="(max-width: 1024px) 100vw, 300px"
            />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
