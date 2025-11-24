'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Cookie } from 'lucide-react';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // We can't check localStorage on the server, so we do it in useEffect.
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-secondary/95 backdrop-blur-sm border-t transition-transform duration-500',
        showConsent ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1 md:mt-0" />
          <p className="text-sm text-secondary-foreground">
            We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies. Read our{' '}
            <Link href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <Button onClick={handleAccept} className="w-full md:w-auto flex-shrink-0">
          Accept
        </Button>
      </div>
    </div>
  );
}
