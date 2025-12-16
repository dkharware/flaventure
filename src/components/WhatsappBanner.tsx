
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export function WhatsappBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('whatsapp_banner_dismissed');
      if (dismissed !== 'true') {
        setIsVisible(true);
      }
    } catch (e) {
      // localStorage is not available, show banner by default
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem('whatsapp_banner_dismissed', 'true');
    } catch(e) {
      // localStorage is not available
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative z-50 bg-gradient-to-r from-[#95bf47] to-teal-500 text-white transition-transform duration-500',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container mx-auto flex items-center justify-center gap-4 p-3 text-center">
        <p className="text-sm sm:text-base font-medium">
          Follow the StoreDevGuide channel on WhatsApp for the latest updates:{' '}
          <Link href="https://whatsapp.com/channel/0029VbCGPhEATRSinMYM2H2p" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-200 font-bold">
            Join Now
          </Link>
        </p>
        <Button onClick={handleDismiss} variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 hover:bg-white/10">
            <X className="h-5 w-5" />
            <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
}
