
'use client';

import React from 'react';
import Link from 'next/link';
import { Newspaper, Phone, Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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

export default function Header() {
  return (
    <header className="py-3 px-4 sm:px-6 md:py-4 md:px-10 bg-background/80 backdrop-blur-sm text-foreground border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" aria-label="easyfreecv Home">
            <div className="md:hidden">
              <Logo width={120} height={32} />
            </div>
            <div className="hidden md:block">
              <Logo />
            </div>
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

        <div className="md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                 <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                 <Link href="/" className="flex items-center gap-2 mb-4" aria-label="easyfreecv Home">
                    <Logo />
                </Link>
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">A list of navigation links for the easyfreecv website.</SheetDescription>
              </SheetHeader>
               <div className="flex flex-col space-y-2">
                 <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Newspaper className="mr-2 h-4 w-4" /> Blog</Link>
                 <Link href="/about" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Newspaper className="mr-2 h-4 w-4" /> About</Link>
                 <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Phone className="mr-2 h-4 w-4" /> Contact</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
