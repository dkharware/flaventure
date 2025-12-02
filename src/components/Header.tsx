
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Newspaper, Phone, Menu, Search, ShoppingCart, Info, ChevronDown, BookCopy, MessageSquare, Home, Wrench, Hammer, FileJson, DraftingCompass } from 'lucide-react';
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
      href: "/blog?query=headless",
      description: "Learn about building custom storefronts with modern frameworks.",
    },
    {
      title: "App Bridge",
      href: "/blog?query=app%20bridge",
      description: "Integrate your app seamlessly with the Shopify admin.",
    },
    {
        title: "Theme Development",
        href: "/blog?query=theme%20development",
        description: "Create beautiful and performant themes for the online store.",
    },
    {
        title: "Storefront API",
        href: "/blog?query=storefront%20api",
        description: "Master the API for building unique shopping experiences.",
    },
    {
        title: "Admin API",
        href: "/blog?query=admin%20api",
        description: "Manage your store programmatically.",
    },
    {
        title: "Hydrogen",
        href: "/blog?query=hydrogen",
        description: "Build fast, custom storefronts with React.",
    },
    {
        title: "Oxygen",
        href: "/blog?query=oxygen",
        description: "Deploy and host your Hydrogen storefronts.",
    },
    {
        title: "Polaris",
        href: "/blog?query=polaris",
        description: "Use Shopify's design system for your apps.",
    },
];

const resourceComponents = [
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
    <header className="h-[81px] flex items-center px-4 sm:px-6 md:px-10 bg-background/80 backdrop-blur-sm text-foreground border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-2 md:gap-4">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" aria-label="storedevguide Home">
            <div className="md:hidden">
              <Logo width={150} height={40} priority />
            </div>
            <div className="hidden md:block">
              <Logo width={136} height={51} priority />
            </div>
          </Link>
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
                              Browse all our latest posts on Shopify, Webflow, and more.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <ListItem href="/blog?tag=Shopify" title="Shopify">
                          Articles on development, headless commerce, and apps.
                        </ListItem>
                      </li>
                      <li>
                        <ListItem href="/blog?tag=Webflow" title="Webflow">
                          Insights and tutorials for the Webflow platform.
                        </ListItem>
                      </li>
                       <li>
                        <ListItem href="/blog?tag=Shopify%20Page%20Builders" title="Shopify Page Builders">
                          Reviews and guides on top Shopify page builders.
                        </ListItem>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
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
                                <li key={component.title}>
                                <ListItem
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                                </li>
                            ))}
                        </div>
                        <div className="col-span-1 grid grid-cols-2 gap-3">
                            {shopifyComponents.slice(2).map((component) => (
                                <li key={component.title}>
                                <ListItem
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                                </li>
                            ))}
                        </div>
                     </ul>
                  </NavigationMenuContent>
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
                  <Link href="/" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Home className="mr-2 h-4 w-4" /> Home</Link>
                  <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Newspaper className="mr-2 h-4 w-4" /> Blog</Link>
                  <Link href="/shopify-liquid-cheatsheet" className={cn(navigationMenuTriggerStyle(), "justify-start")}><BookCopy className="mr-2 h-4 w-4" /> Liquid Cheatsheet</Link>
                  <Link href="/tutorials/shopify-api-guide" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Wrench className="mr-2 h-4 w-4" /> API Guide</Link>
                  
                  <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Tools</p>
                  <Link href="/tools/meta-tag-generator" className={cn(navigationMenuTriggerStyle(), "justify-start ml-4")}><DraftingCompass className="mr-2 h-4 w-4" /> Meta Tag Generator</Link>
                  <Link href="/tools/liquid-to-json-converter" className={cn(navigationMenuTriggerStyle(), "justify-start ml-4")}><FileJson className="mr-2 h-4 w-4" /> Liquid to JSON</Link>
                  <Link href="/tools/product-schema-generator" className={cn(navigationMenuTriggerStyle(), "justify-start ml-4")}><Hammer className="mr-2 h-4 w-4" /> Product Schema</Link>

                  <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Company</p>
                  <Link href="/about" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Info className="mr-2 h-4 w-4" /> About</Link>
                  <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Phone className="mr-2 h-4 w-4" /> Contact</Link>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

    