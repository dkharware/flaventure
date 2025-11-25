
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Newspaper, Phone, Menu, Search, ShoppingCart, Info } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Logo } from './Logo';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ListItem } from './ListItem';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { Input } from './ui/input';
import { LiveSearch } from './LiveSearch';
import { Separator } from './ui/separator';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
        router.push(`/blog?query=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
        setIsSearchFocused(false);
    } else {
        router.push('/blog');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="py-3 px-4 sm:px-6 md:py-4 md:px-10 bg-background/80 backdrop-blur-sm text-foreground border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-2 md:gap-4">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" aria-label="easyfreecv Home">
            <div className="md:hidden">
              <Logo width={100} height={28} />
            </div>
            <div className="hidden md:block">
              <Logo />
            </div>
          </Link>
        </div>

        <div className="md:hidden flex-grow max-w-xs relative" ref={searchWrapperRef}>
          <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Input 
                type="search" 
                name="search"
                placeholder="Search articles..." 
                className="h-9 pr-9 text-xs rounded-full bg-muted border-none focus-visible:ring-2 focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-9 w-9 rounded-full">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
          </form>
          {isSearchFocused && searchQuery && (
             <LiveSearch 
                query={searchQuery} 
                onClose={() => setIsSearchFocused(false)} 
             />
          )}
        </div>

        <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                 <NavigationMenuItem>
                  <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                       <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/blog"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              All Articles
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Browse all our latest posts on Shopify, resume building, and more.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/blog?tag=Shopify" title="Shopify">
                        Articles on development, headless commerce, and apps.
                      </ListItem>
                      <ListItem href="/blog?tag=Resume" title="Resume & CV">
                        Tips and tricks for creating the perfect resume.
                      </ListItem>
                       <ListItem href="/blog?tag=cv" title="CV Writing">
                        Guidance on writing a comprehensive Curriculum Vitae.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shopify</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px] ">
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/blog?tag=Shopify"
                          >
                            <ShoppingCart className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Shopify Topics
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/blog?query=headless" title="Headless">
                        Learn about building custom storefronts with modern frameworks.
                      </ListItem>
                      <ListItem href="/blog?query=app%20bridge" title="App Bridge">
                        Integrate your app seamlessly with the Shopify admin.
                      </ListItem>
                      <ListItem href="/blog?query=storefront%20api" title="Storefront API">
                        Master the API for building unique shopping experiences.
                      </ListItem>
                      <ListItem href="/blog?query=theme%20development" title="Theme Development">
                        Create beautiful and performant themes for Shopify.
                      </ListItem>
                      <ListItem href="/blog?query=admin%20api" title="Admin API">
                        Manage your store programmatically.
                      </ListItem>
                      <ListItem href="/blog?query=hydrogen" title="Hydrogen">
                        Build fast, custom storefronts with React.
                      </ListItem>
                      <ListItem href="/blog?query=oxygen" title="Oxygen">
                        Deploy and host your Hydrogen storefronts.
                      </ListItem>
                      <ListItem href="/blog?query=polaris" title="Polaris">
                        Use Shopify's design system for your apps.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/about">
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/contact">
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
        </div>
        
        <div className="hidden md:flex items-center justify-end gap-2 flex-shrink-0">
           <Button asChild>
                <Link href="/blog">
                    Explore Articles
                </Link>
            </Button>
        </div>

        <div className="md:hidden flex-shrink-0">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                 <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                 <Link href="/" className="flex items-center gap-2 mb-4" aria-label="easyfreecv Home">
                    <Logo />
                </Link>
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">A list of navigation links for the easyfreecv website.</SheetDescription>
              </SheetHeader>
               <div className="flex flex-col space-y-2">
                  <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Newspaper className="mr-2 h-4 w-4" /> Blog</Link>
                  <Link href="/about" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Info className="mr-2 h-4 w-4" /> About</Link>
                  <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Phone className="mr-2 h-4 w-4" /> Contact</Link>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col space-y-2">
                <h4 className="font-semibold text-sm px-4 py-2 flex items-center"><ShoppingCart className="mr-2 h-4 w-4" /> Shopify Topics</h4>
                <Link href="/blog?query=headless" className={cn(navigationMenuTriggerStyle(), "justify-start font-normal text-muted-foreground")}>Headless</Link>
                <Link href="/blog?query=app%20bridge" className={cn(navigationMenuTriggerStyle(), "justify-start font-normal text-muted-foreground")}>App Bridge</Link>
                <Link href="/blog?query=storefront%20api" className={cn(navigationMenuTriggerStyle(), "justify-start font-normal text-muted-foreground")}>Storefront API</Link>
                <Link href="/blog?query=theme%20development" className={cn(navigationMenuTriggerStyle(), "justify-start font-normal text-muted-foreground")}>Theme Development</Link>
                <Link href="/blog?query=admin%20api" className={cn(navigationMenuTriggerStyle(), "justify-start font-normal text-muted-foreground")}>Admin API</Link>
                <Link href="/blog?query=hydrogen" className={cn(navigationMenuTriggerStyle(), "justify-start font-normal text-muted-foreground")}>Hydrogen</Link>
                <Link href="/blog?query=oxygen" className={cn(navigationMenuTriggerStyle(), "justify-start font-normal text-muted-foreground")}>Oxygen</Link>
                <Link href="/blog?query=polaris" className={cn(navigationMenuTriggerStyle(), "justify-start font-normal text-muted-foreground")}>Polaris</Link>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
