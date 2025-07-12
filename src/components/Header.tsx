
'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Crown, PenSquare, Palette, Sparkles, BookUser } from 'lucide-react';
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

const featureLinks: { title: string; href: string; description: string; icon: React.ReactElement }[] = [
  {
    title: 'AI Resume Writer',
    href: '/editor/professional',
    description: 'Get AI-powered suggestions for skills and summaries.',
    icon: <Sparkles className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Template Customizer',
    href: '/editor/professional',
    description: 'Easily edit and customize your resume content.',
    icon: <PenSquare className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Explore All Templates',
    href: '/templates',
    description: 'Browse our full collection of professional designs.',
    icon: <Palette className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Cover Letter Builder',
    href: '/templates?category=Cover+Letter',
    description: 'Create matching cover letters for your resumes.',
    icon: <BookUser className="h-8 w-8 text-primary" />,
  },
];

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { icon: React.ReactElement }>(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'flex items-center gap-4 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="flex-shrink-0 w-10">{icon}</div>
            <div className="flex-grow">
              <div className="text-base font-bold leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export default function Header() {
  return (
    <header className="py-4 px-6 md:px-10 bg-background text-foreground border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2" aria-label="EasyFreeCV Home">
            <Logo />
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resume Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      {featureLinks.map((component) => (
                        <Link key={component.title} href={component.href} passHref>
                          <ListItem title={component.title} icon={component.icon}>
                            {component.description}
                          </ListItem>
                        </Link>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/templates">
                      Templates
                    </Link>
                  </NavigationMenuLink>
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
        
        <div className="flex-1 flex justify-end gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
        </div>

      </div>
    </header>
  );
}
