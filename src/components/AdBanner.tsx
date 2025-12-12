
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export function AdBanner() {
  return (
    <a href="https://otieu.com/4/10313318" target="_blank" rel="noopener noreferrer sponsored" className="block group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-background/50 backdrop-blur-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src="https://picsum.photos/seed/adbanner/600/400"
            alt="Advertisement"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="product advertisement"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="secondary" className="shadow-md bg-yellow-500/20 text-yellow-200 border border-yellow-500/50">Sponsored</Badge>
          </div>
           <div className="absolute top-3 right-3 z-10 bg-black/50 rounded-full p-1.5">
            <ExternalLink className="h-3 w-3 text-white" />
          </div>
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-base font-headline group-hover:text-primary transition-colors line-clamp-2">Check Out This Amazing Offer</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-4 pt-0">
            <div className="text-sm text-muted-foreground flex-grow line-clamp-2">
                Discover exclusive deals and products. Click to learn more about what our partners have to offer.
            </div>
             <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                Advertisement
            </div>
        </CardContent>
      </Card>
    </a>
  );
}
