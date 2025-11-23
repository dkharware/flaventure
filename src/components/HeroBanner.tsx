'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-grid-black/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <div className="container px-6 md:px-10 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                Create Your Free Resume & CV, Fast.
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Choose from professional templates, get AI-powered suggestions for your CV or CV letter, and land your dream job. It's easy and free.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" variant="default">
                    <Link href="/templates">
                    Create Your Free Resume Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/templates">
                    Explore CV Templates
                    </Link>
                </Button>
                </div>
            </div>
        </div>
    </section>
  );
}
