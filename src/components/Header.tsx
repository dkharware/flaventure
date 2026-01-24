
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Newspaper, Phone, Menu, Search, Info, ChevronDown, BookCopy, Wrench, Sparkles, Home, LayoutTemplate, Utensils, Code, Map, Mountain, UtensilsCrossed } from 'lucide-react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ThemeSwitcher } from './ThemeSwitcher';

const resourceComponents = [
    {
      title: "Travel Guide",
      href: "/blog?tag=travel%20guide",
      icon: <BookCopy className="h-4 w-4" />,
      description: "In-depth guides to unforgettable destinations.",
    },
    {
      title: "Adventure",
      href: "/blog?tag=Adventure",
      icon: <Mountain className="h-4 w-4" />,
      description: "Tales of exploration and thrilling journeys.",
    },
    {
      title: "Famous Food",
      href: "/blog?tag=Famous%20Food",
      icon: <UtensilsCrossed className="h-4 w-4" />,
      description: "Discover iconic dishes from around the world.",
    },
    {
      title: "Must-Visit Places",
      href: "/blog?tag=Must-Visit%20Places",
      icon: <Map className="h-4 w-4" />,
      description: "Iconic locations you need to see.",
    },
    {
        title: "Food Recipes",
        href: "/blog?tag=Food%20Recipes",
        icon: <Sparkles className="h-4 w-4" />,
        description: "Authentic recipes to try from your travels.",
    }
];

const toolsComponents = [
    {
      title: "All Tools & Guides",
      href: "/tools",
      icon: <Wrench className="h-4 w-4" />,
      description: "Browse our full suite of tools for travelers and foodies."
    },
    {
      title: "AI Content Generator",
      href: "/tools/shopify-ai-content-generator",
      icon: <Sparkles className="h-4 w-4" />,
      description: "Generate blog post ideas and engaging descriptions."
    },
    {
      title: "Recipe Schema Generator",
      href: "/tools/recipe-schema-generator",
      icon: <Code className="h-4 w-4" />,
      description: "Get rich snippets for your recipes in Google search."
    }
];

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetUrl = searchQuery.trim() 
      ? `/blog?query=${encodeURIComponent(searchQuery.trim())}` 
      : '/blog';
    router.push(targetUrl);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);


  return (
    <header className="sticky top-0 left-0 right-0 z-[60] transition-all duration-300 shadow-sm bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between gap-4 h-20 px-4 md:px-6">
          <div className="flex-1 md:flex-initial">
          <Link href="/" className="flex items-center gap-2" aria-label="Flaventure Home">
              <Logo width={120} height={32} priority />
          </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
              <NavigationMenu>
              <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/blog">
                        Blog
                        </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
                    <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                     <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {toolsComponents.map((component) => (
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
                      placeholder="Search for destinations, recipes, and stories..."
                      className="h-12 text-base pr-12"
                    />
                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10" aria-label="Submit search">
                      <Search className="h-5 w-5" />
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <ThemeSwitcher />
              <Button asChild className="rounded-full hidden sm:flex">
                  <Link href="/contact">Contact</Link>
              </Button>
          </div>

          <div className="md:hidden flex-shrink-0">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open mobile navigation menu">
                  <Menu className="h-5 w-5" />
              </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto w-full max-w-xs">
                <SheetHeader>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 mb-4" aria-label="Flaventure Home">
                        <Logo width={150} height={40}/>
                    </Link>
                    <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                    <SheetDescription className="sr-only">A list of navigation links for the Flaventure website.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-2 mt-4 pt-2">
                    <Accordion type="multiple" className="w-full">
                        <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className={cn(navigationMenuTriggerStyle(), "justify-start w-full font-semibold text-base")}>
                            <Newspaper className="mr-2 h-4 w-4" /> Blog
                        </Link>
                        <AccordionItem value="resources">
                            <AccordionTrigger className={cn(navigationMenuTriggerStyle(), "justify-between w-full font-semibold text-base")}>
                                <div className="flex items-center"><BookCopy className="mr-2 h-4 w-4" /> Explore</div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-4">
                                {resourceComponents.map(item => (
                                    <Link key={item.title} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-muted-foreground hover:text-primary">
                                        {item.title}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="tools">
                            <AccordionTrigger className={cn(navigationMenuTriggerStyle(), "justify-between w-full font-semibold text-base")}>
                                <div className="flex items-center"><Wrench className="mr-2 h-4 w-4" /> Tools</div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-4">
                                {toolsComponents.map(item => (
                                    <Link key={item.title} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-muted-foreground hover:text-primary">
                                        {item.title}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                         <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={cn(navigationMenuTriggerStyle(), "justify-start w-full font-semibold text-base")}>
                            <Info className="mr-2 h-4 w-4" /> About
                        </Link>
                         <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={cn(navigationMenuTriggerStyle(), "justify-start w-full font-semibold text-base")}>
                            <Phone className="mr-2 h-4 w-4" /> Contact
                        </Link>
                    </Accordion>
                </div>
              </SheetContent>
          </Sheet>
          </div>
      </div>
    </header>
  );
}
