
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Palette, PenSquare, LayoutDashboard, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/templates', label: 'Templates', icon: Palette },
  { href: '/editor/professional', label: 'Create', icon: PenSquare, auth: true },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, auth: true },
  { href: '/blog', label: 'Blog', icon: Newspaper },
];

export function MobileNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const filteredNavItems = navItems.filter(item => !item.auth || isAuthenticated);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <nav className="h-full">
        <ul className="h-full flex justify-around items-center">
          {filteredNavItems.map(({ href, label, icon: Icon }) => (
            <li key={href} className="h-full">
              <Link
                href={href}
                className={cn(
                  'h-full flex flex-col items-center justify-center text-xs w-16 transition-colors',
                  pathname === href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
