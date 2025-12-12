
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Newspaper, Phone, Menu, Search, ShoppingCart, Info, ChevronDown, BookCopy, MessageSquare, Home, Wrench, Hammer, FileJson, DraftingCompass, LayoutTemplate, Sparkles, ArrowRight } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ListItem } from './ListItem';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { Input } from './ui/input';
import { LiveSearch } from './LiveSearch';

const resourceComponents = [
    {
      title: "Blog",
      href: "/blog",
      description: "Browse all our latest posts on Shopify, Webflow, and more.",
    },
    {
      title: "Shopify Liquid Cheatsheet",
      href: "/shopify-liquid-cheatsheet",
      description: "Your complete quick reference guide for Shopify Liquid.",
    },
    {
      title: "Shopify API Guide",
      href: "/tutorials/shopify-api-guide",
      description: "A comprehensive guide to using the Storefront and Admin APIs.",
    },
];

const toolComponents = [
    {
      title: "Shopify AI Content Generator",
      href: "/tools/shopify-ai-content-generator",
      description: "Generate product descriptions and blog posts with AI.",
    },
    {
      title: "Meta Tag Generator",
      href: "/tools/meta-tag-generator",
      description: "Generate SEO-friendly meta tags for products, pages, and articles.",
    },
    {
      title: "Liquid to JSON Converter",
      href: "/tools/liquid-to-json-converter",
      description: "Convert Liquid objects to JSON for debugging and headless use.",
    },
    {
      title: "Product Schema Generator",
      href: "/tools/product-schema-generator",
      description: "Create JSON-LD schema markup for your products to improve SEO.",
    },
];

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
        router.push(`/blog?query=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
        setIsSearchOpen(false);
    } else {
        router.push('/blog');
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);


  return (
    <header className={cn(
      "sticky top-0 left-0 right-0 z-[60] transition-all duration-300",
      isScrolled ? "shadow-md bg-background/80 backdrop-blur-lg" : ""
    )}>
      <div className="container mx-auto flex items-center justify-between gap-4 h-20 px-4 md:px-6">
          <div className="flex-1 md:flex-initial">
          <Link href="/" className="flex items-center gap-2" aria-label="storedevguide Home">
              <Logo width={120} height={32} priority />
          </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
              <NavigationMenu>
              <NavigationMenuList>
                  <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/blog">
                      Articles
                      </Link>
                  </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/blog?tag=Headless">
                        Categories
                        </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/about">
                      About
                      </Link>
                  </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                  <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
                  <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {[...resourceComponents, ...toolComponents].map((component) => (
                          <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          >
                          {component.description}
                          </ListItem>
                      ))}
                      </ul>
                  </NavigationMenuContent>
                  </NavigationMenuItem>
              </NavigationMenuList>
              </NavigationMenu>
          </div>
          
          <div className="flex items-center justify-end gap-2 flex-1 md:flex-initial">
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} aria-label="Open search">
                    <Search className="h-5 w-5" />
                </Button>
                <DialogContent className="top-1/4">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Input
                      ref={inputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for articles, guides, and tutorials..."
                      className="h-12 text-base pr-12"
                    />
                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10" aria-label="Submit search">
                      <Search className="h-5 w-5" />
                    </Button>
                    {searchQuery && <LiveSearch query={searchQuery} onClose={() => setIsSearchOpen(false)} />}
                  </form>
                </DialogContent>
              </Dialog>
              <Button asChild className="rounded-full hidden sm:flex">
                  <Link href="/contact">Contact <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
          </div>

          <div className="md:hidden flex-shrink-0">
          <Sheet>
              <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open mobile navigation menu">
                  <Menu className="h-5 w-5" />
              </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto w-full max-w-xs">
              <SheetHeader>
                  <Link href="/" className="flex items-center gap-2 mb-4" aria-label="storedevguide Home">
                      <Logo width={150} height={40}/>
                  </Link>
                  <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">A list of navigation links for the storedevguide website.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-1 mt-4 pt-2">
                  <NavigationMenu orientation="vertical" className="w-full">
                  <NavigationMenuList className="flex-col items-stretch space-x-0 space-y-1 w-full">
                      <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                          <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "justify-start w-full")}><Newspaper className="mr-2 h-4 w-4" /> Articles</Link>
                      </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                          <Link href="/about" className={cn(navigationMenuTriggerStyle(), "justify-start w-full")}><Info className="mr-2 h-4 w-4" /> About</Link>
                      </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                          <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "justify-start w-full")}><Phone className="mr-2 h-4 w-4" /> Contact</Link>
                      </NavigationMenuLink>
                      </NavigationMenuItem>
                  </NavigationMenuList>
                  </NavigationMenu>
              </div>
              </SheetContent>
          </Sheet>
          </div>
      </div>
    </header>
  );
}
