
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Newspaper, Phone, Menu, Search, ShoppingCart, Info, ChevronDown, BookCopy, MessageSquare, Home, Wrench, Hammer, FileJson, DraftingCompass, LayoutTemplate } from 'lucide-react';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ListItem } from './ListItem';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { Input } from './ui/input';
import { LiveSearch } from './LiveSearch';

const shopifyComponents = [
    {
      title: "Headless",
      href: "/blog?tag=Headless",
      description: "Learn about building custom storefronts with modern frameworks.",
    },
    {
      title: "App Bridge",
      href: "/blog?tag=Shopify%20App%20Bridge",
      description: "Integrate your app seamlessly with the Shopify admin.",
    },
    {
        title: "Theme Development",
        href: "/blog?tag=Theme%20Development",
        description: "Create beautiful and performant themes for the online store.",
    },
    {
        title: "Storefront API",
        href: "/blog?tag=Storefront%20API",
        description: "Master the API for building unique shopping experiences.",
    },
    {
        title: "Admin API",
        href: "/blog?tag=Admin%20API",
        description: "Manage your store programmatically.",
    },
    {
        title: "Hydrogen",
        href: "/blog?tag=Hydrogen",
        description: "Build fast, custom storefronts with React.",
    },
];

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
    <header className="fixed top-0 left-0 right-0 p-4 flex justify-center z-[60]">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 h-16 px-6 bg-black/50 border border-white/10 backdrop-blur-lg rounded-full">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 rounded-md" aria-label="storedevguide Home">
            <div className="md:hidden">
              <Logo width={120} height={32} priority />
            </div>
            <div className="hidden md:block">
              <Logo width={120} height={32} priority />
            </div>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shopify</NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <ul className="grid gap-3 p-4 md:w-[550px] md:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild>
                            <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/blog?tag=Shopify"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                <div className="mb-2 mt-4 text-lg font-medium">Shopify Topics</div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                    Explore all our articles related to the Shopify ecosystem.
                                </p>
                            </a>
                            </NavigationMenuLink>
                        </li>
                        <div className="grid grid-cols-2 gap-3">
                            {shopifyComponents.slice(0, 2).map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </div>
                        <div className="col-span-1 grid grid-cols-2 gap-3">
                            {shopifyComponents.slice(2).map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </div>
                     </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/shopify-templates-boilerplates">
                      Templates
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                      {resourceComponents.map((component) => (
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
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shopify Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                      {toolComponents.map((component) => (
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
        
        <div className="hidden md:flex items-center justify-end gap-4 flex-shrink-0">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open search dialog">
                    <Search className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="top-1/4">
                <DialogHeader>
                  <DialogTitle>Search Articles</DialogTitle>
                  <DialogDescription>
                    Find articles about Shopify, headless, and more.
                  </DialogDescription>
                </DialogHeader>
                <div className="relative">
                  <form onSubmit={handleSearchSubmit} className="relative w-full">
                      <Input 
                        ref={inputRef}
                        type="search" 
                        name="search"
                        placeholder="e.g. 'Shopify theme', 'app bridge'..." 
                        className="h-10 pr-10 bg-muted/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search input"
                      />
                      <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-10 w-10" aria-label="Submit search">
                        <Search className="h-4 w-4" />
                      </Button>
                  </form>
                  {searchQuery && (
                    <LiveSearch 
                      query={searchQuery} 
                      onClose={() => setIsSearchOpen(false)}
                      className="top-12"
                    />
                  )}
                </div>
            </DialogContent>
           </Dialog>
           <Button asChild className="rounded-full">
            <Link href="/contact">Get in Touch</Link>
           </Button>
        </div>

        <div className="md:hidden flex-shrink-0">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open mobile navigation menu">
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
              <div className="mt-4">
                  <form onSubmit={handleSearchSubmit} className="relative w-full">
                      <Input 
                        type="search" 
                        name="search"
                        placeholder="Search articles..." 
                        className="h-10 pr-10"
                        defaultValue={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search articles input"
                      />
                      <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-10 w-10" aria-label="Submit article search">
                        <Search className="h-4 w-4" />
                      </Button>
                  </form>
              </div>
              
               <div className="flex flex-col space-y-1 mt-4 border-t pt-2">
                 <NavigationMenu orientation="vertical" className="w-full">
                  <NavigationMenuList className="flex-col items-stretch space-x-0 space-y-1 w-full">
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/" className={cn(navigationMenuTriggerStyle(), "justify-start w-full")}><Home className="mr-2 h-4 w-4" /> Home</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "justify-start w-full")}><Newspaper className="mr-2 h-4 w-4" /> Blog</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/shopify-templates-boilerplates" className={cn(navigationMenuTriggerStyle(), "justify-start w-full")}><LayoutTemplate className="mr-2 h-4 w-4" /> Templates</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/shopify-liquid-cheatsheet" className={cn(navigationMenuTriggerStyle(), "justify-start w-full")}><BookCopy className="mr-2 h-4 w-4" /> Liquid Cheatsheet</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/tutorials/shopify-api-guide" className={cn(navigationMenuTriggerStyle(), "justify-start w-full")}><Wrench className="mr-2 h-4 w-4" /> API Guide</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    
                    <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Tools</p>
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/tools/meta-tag-generator" className={cn(navigationMenuTriggerStyle(), "justify-start ml-4 w-[calc(100%-1rem)]")}><DraftingCompass className="mr-2 h-4 w-4" /> Meta Tag Generator</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/tools/liquid-to-json-converter" className={cn(navigationMenuTriggerStyle(), "justify-start ml-4 w-[calc(100%-1rem)]")}><FileJson className="mr-2 h-4 w-4" /> Liquid to JSON</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/tools/product-schema-generator" className={cn(navigationMenuTriggerStyle(), "justify-start ml-4 w-[calc(100%-1rem)]")}><Hammer className="mr-2 h-4 w-4" /> Product Schema</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Company</p>
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
