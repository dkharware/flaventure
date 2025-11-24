
'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    useGSAP(() => {
        gsap.from('.hero-element', {
          duration: 1,
          opacity: 0,
          y: 50,
          stagger: 0.2,
          ease: 'power3.out',
        });
    }, []);

    return (
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-red-50/50"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d1eaff,transparent)] opacity-30"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_0px,#ffd5d5,transparent)] opacity-30"></div>
            </div>
            <div className="container px-6 md:px-10 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground hero-element">
                      Expert Shopify & Resume Mastery
                    </h1>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl hero-element">
                      Unlock your potential with in-depth articles on Shopify development and career-defining resume strategies. Your go-to resource for expert tips and trends.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row hero-element">
                    <Button asChild size="lg" variant="default">
                        <Link href="/blog">
                         Explore Articles <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
