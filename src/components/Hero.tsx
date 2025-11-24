
'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { Input } from './ui/input';

export function Hero() {
    const router = useRouter();
    
    useGSAP(() => {
        gsap.from('.hero-element', {
          duration: 1,
          opacity: 0,
          y: 50,
          stagger: 0.2,
          ease: 'power3.out',
        });
    }, []);
    
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('search') as string;
        if (searchQuery.trim()) {
            router.push(`/blog?query=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/blog');
        }
    };

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
                    <div className="w-full max-w-lg hero-element">
                      <form onSubmit={handleSearch} className="flex gap-2 bg-background/50 backdrop-blur-sm p-2 rounded-full border">
                          <Input 
                            type="search" 
                            name="search"
                            placeholder="Search for articles on 'headless', 'themes', 'seo'..." 
                            className="flex-grow !bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          <Button type="submit" size="icon" variant="glow">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                          </Button>
                      </form>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row hero-element">
                    <Button asChild size="pill" variant="glow">
                        <Link href="/blog">
                         Explore All Articles
                         <span className="ml-4 h-8 w-8 rounded-full bg-accent flex items-center justify-center text-primary group-hover:bg-primary-foreground transition-colors">
                            <ArrowRight className="h-4 w-4" />
                         </span>
                        </Link>
                    </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
