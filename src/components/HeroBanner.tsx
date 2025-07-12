
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-white">
      <div className="container px-6 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
              Create your standout resume, fast.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Choose from professional templates, get AI-powered suggestions, and land your dream job. It's easy and free.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="default">
                <Link href="/templates">
                  Create Your Resume Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/templates">
                  Explore Templates
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
             <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="resume modern"
                alt="Resume template example 1"
                width={550}
                height={310}
                className="rounded-lg shadow-2xl object-cover transform rotate-[-3deg] transition-transform duration-300 hover:rotate-[-1deg] hover:scale-105"
            />
             <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="resume creative"
                alt="Resume template example 2"
                width={550}
                height={310}
                className="rounded-lg shadow-2xl object-cover absolute transform rotate-[5deg] transition-transform duration-300 hover:rotate-[2deg] hover:scale-105 border-4 border-background"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
