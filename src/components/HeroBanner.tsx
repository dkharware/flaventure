
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, FileText, Briefcase, Star, Palette } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-red-50/50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d1eaff,transparent)] opacity-30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_0px,#ffd5d5,transparent)] opacity-30"></div>
             <div className="icon-container absolute inset-0">
                <FileText className="absolute top-[10%] left-[10%] w-12 h-12 text-primary/20 animate-float" style={{ animationDelay: '0s', animationDuration: '15s' }} />
                <Briefcase className="absolute top-[20%] right-[15%] w-16 h-16 text-primary/20 animate-float" style={{ animationDelay: '2s', animationDuration: '18s' }} />
                <Star className="absolute bottom-[15%] left-[20%] w-10 h-10 text-primary/20 animate-float" style={{ animationDelay: '4s', animationDuration: '20s' }} />
                <Palette className="absolute bottom-[25%] right-[25%] w-14 h-14 text-primary/20 animate-float" style={{ animationDelay: '6s', animationDuration: '16s' }} />
                <FileText className="absolute top-[50%] left-[45%] w-8 h-8 text-primary/10 animate-float" style={{ animationDelay: '8s', animationDuration: '22s' }} />
            </div>
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
