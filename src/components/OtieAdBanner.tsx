'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function OtieAdBanner({ className }: { className?: string }) {
  return (
    <Card className={`relative overflow-hidden group ${className}`}>
      <Link href="https://otieu.com/4/10313318" target="_blank" rel="noopener sponsored" className="block">
        <div className="relative h-40 w-full">
            <Image
                src="https://picsum.photos/seed/otieu-ad/600/400"
                alt="Advertisement"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="advertisement marketing"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <CardContent className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-headline font-bold text-white">Check This Out</h3>
          <p className="text-sm text-white/80 line-clamp-2">Discover exclusive offers and unique products. Click to learn more!</p>
          <Button variant="default" size="sm" className="mt-2 text-xs">
            Shop Now <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}
