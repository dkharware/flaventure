
'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Crown, PenSquare, Palette, Sparkles, BookUser, Menu, LayoutDashboard, LogOut } from 'lucide-react';
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
import { logout } from '@/app/actions/user';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';


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

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactElement }>(
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
           {icon && <div className="flex-shrink-0 w-10">{icon}</div>}
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

function AuthButtons() {
    const { isAuthenticated } = useAuth();
    
    if (isAuthenticated) {
        return (
            <form action={logout}>
                <Button variant="ghost" type="submit">Sign Out</Button>
            </form>
        );
    }

    return (
        <>
            <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </>
    );
}

function MobileAuthButtons() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
             <form action={logout} className="w-full">
                <Button variant="outline" className="w-full" type="submit">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
            </form>
        )
    }

    return (
        <>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button className="w-full" asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </>
    )
}

export default function Header() {
    const { isAuthenticated } = useAuth();

  return (
    <header className="py-4 px-4 sm:px-6 md:px-10 bg-background text-foreground border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" aria-label="EasyFreeCV Home">
            <Logo />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resume Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      {featureLinks.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          icon={component.icon}
                        >
                          {component.description}
                        </ListItem>
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
                 {isAuthenticated && <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/dashboard">
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>}
              </NavigationMenuList>
            </NavigationMenu>
        </div>
        
        <div className="hidden md:flex items-center justify-end gap-2 flex-shrink-0">
            <AuthButtons />
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
                 <Link href="/" className="flex items-center gap-2 mb-4" aria-label="EasyFreeCV Home">
                    <Logo />
                </Link>
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">A list of navigation links for the EasyFreeCV website.</SheetDescription>
              </SheetHeader>
               <div className="flex flex-col space-y-2">
                 <Link href="/templates" className={cn(navigationMenuTriggerStyle(), "justify-start")}><Palette className="mr-2 h-4 w-4" /> Templates</Link>
                 {isAuthenticated && <Link href="/dashboard" className={cn(navigationMenuTriggerStyle(), "justify-start")}><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>}
                 <Link href="/editor/professional" className={cn(navigationMenuTriggerStyle(), "justify-start")}><PenSquare className="mr-2 h-4 w-4" /> Create Resume</Link>
                  <Link href="/templates?category=Cover+Letter" className={cn(navigationMenuTriggerStyle(), "justify-start")}><BookUser className="mr-2 h-4 w-4" /> Cover Letters</Link>
              </div>
              <div className="mt-6 pt-6 border-t space-y-2">
                <MobileAuthButtons />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
