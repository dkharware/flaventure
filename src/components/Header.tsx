'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, Briefcase, Star, UserCircle, FileText as FileTextIcon } from 'lucide-react';
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

const categories: { title: string; href: string; description: string; icon: React.ReactElement }[] = [
  {
    title: 'Modern',
    href: '/templates',
    description: 'Sleek templates for the contemporary professional.',
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    title: 'Creative',
    href: '/templates',
    description: 'Express your personality with visually striking resumes.',
    icon: <Star className="h-4 w-4" />,
  },
  {
    title: 'Corporate',
    href: '/templates',
    description: 'Classic, professional designs perfect for any industry.',
    icon: <UserCircle className="h-4 w-4" />,
  },
  {
    title: 'Simple',
    href: '/templates',
    description: 'Clean, minimalist templates that focus on content.',
    icon: <FileTextIcon className="h-4 w-4" />,
  },
];

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export default function Header() {
  return (
    <header className="py-4 px-6 md:px-10 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2" aria-label="ResumeFlow Home">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-headline font-bold text-foreground">ResumeFlow</h1>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resume Templates</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-12 gap-x-8 p-4 md:w-[600px] lg:w-[700px]">
                      <div className="col-span-4">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/templates"
                            className="relative h-full flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          >
                            <Image
                              src="https://placehold.co/400x565.png"
                              data-ai-hint="resume professional"
                              alt="Featured Template"
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-md opacity-20"
                            />
                            <FileText className="h-6 w-6 text-primary" />
                            <div className="mb-2 mt-4 text-lg font-medium">ResumeFlow</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed, AI-powered resume templates.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <ul className="col-span-8 grid grid-cols-2 gap-2">
                        {categories.map((component) => (
                          <Link key={component.title} href={component.href} passHref>
                            <ListItem title={component.title}>
                              <div className="flex items-start gap-2">
                                <div className="text-primary mt-0.5">{component.icon}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {component.description}
                                </p>
                              </div>
                            </ListItem>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/editor/professional">
                      Create Resume
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
        </div>
        
        <div className="flex-1" />

      </div>
    </header>
  );
}
