
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/context/ChatContext';
import { Button } from './ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export function MobileNav() {
  const pathname = usePathname();
  const { toggleChat, isChatOpen } = useChat();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <nav className="h-full">
        <ul className="h-full grid grid-cols-4 items-center">
          {navItems.map(({ href, label, icon: Icon }) => (
            <li key={href} className="h-full">
              <Link
                href={href}
                className={cn(
                  'h-full flex flex-col items-center justify-center text-xs w-full transition-colors',
                  pathname === href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
           <li className="h-full">
              <button
                onClick={toggleChat}
                className={cn(
                    'h-full flex flex-col items-center justify-center text-xs w-full transition-colors',
                    isChatOpen ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                <MessageSquare className="w-5 h-5 mb-0.5" />
                <span>Chat</span>
              </button>
            </li>
        </ul>
      </nav>
    </div>
  );
}
