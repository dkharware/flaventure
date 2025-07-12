'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoader } from '@/context/LoaderContext';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

      if (
        anchor &&
        anchor.href &&
        anchor.target !== '_blank' &&
        new URL(anchor.href).origin === window.location.origin &&
        anchor.href !== window.location.href
      ) {
        showLoader();
      }
    };
    
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [showLoader]);

  useEffect(() => {
    hideLoader();
  }, [pathname, searchParams, hideLoader]);

  return null;
}
