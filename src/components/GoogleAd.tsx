'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { Card } from './ui/card';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const GoogleAd = ({ className }: { className?: string }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <Card className={className}>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
        data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Card>
  );
};
