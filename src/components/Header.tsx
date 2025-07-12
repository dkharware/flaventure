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
    icon: <Sparkles className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Template Customizer',
    href: '/editor/professional',
    description: 'Easily edit and customize your resume content.',
    icon: <PenSquare className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Explore All Templates',
    href: '/templates',
    description: 'Browse our full collection of professional designs.',
    icon: <Palette className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Cover Letter Builder',
    href: '#', // TBD
    description: 'Create matching cover letters for your resumes.',
    icon: <BookUser className="h-6 w-6 text-primary" />,
  },
];

const templateLinks = [
  { title: 'Modern', href: '/templates' },
  { title: 'Creative', href: '/templates' },
  { title: 'Corporate', href: '/templates' },
  { title: 'Simple', href: '/templates' },
  { title: 'Technical', href: '/templates' },
  { title: 'Academic', href: '/templates' },
];


const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { icon: React.ReactElement }>(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'flex items-start gap-4 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex-grow">
              <div className="text-sm font-bold leading-none">{title}</div>
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
                  <NavigationMenuTrigger>Resume Templates</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-3 gap-4 p-4 md:w-[650px] lg:w-[750px]">
                      <ul className="col-span-2 grid grid-rows-2 gap-2">
                        {featureLinks.map((component) => (
                          <Link key={component.title} href={component.href} passHref>
                            <ListItem title={component.title} icon={component.icon}>
                              {component.description}
                            </ListItem>
                          </Link>
                        ))}
                      </ul>
                       <div className="col-span-1 flex flex-col justify-start space-y-2 py-3 px-2">
                        <h3 className="font-bold text-sm px-2">TEMPLATES</h3>
                        {templateLinks.map((link) => (
                          <Link key={link.title} href={link.href} passHref>
                              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-normal justify-start w-full hover:bg-accent/50")}>
                                {link.title}
                              </NavigationMenuLink>
                          </Link>
                        ))}
                         <div className="h-px w-full bg-border my-2"></div>
                         <h3 className="font-bold text-sm px-2">PREMIUM</h3>
                          <Link href={'/templates'} passHref>
                              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-normal justify-start w-full bg-primary/10 text-primary hover:bg-primary/20")}>
                                <Crown className="mr-2 h-4 w-4" /> Premium Templates
                              </NavigationMenuLink>
                          </Link>
                      </div>
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
        
        <div className="flex-1 flex justify-end gap-2">
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
        </div>

      </div>
    </header>
  );
}