
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';

export function GoogleAd() {
  useEffect(() => {
    // In a real application, you would load the Google Ads script here.
    // For example:
    // const script = document.createElement('script');
    // script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    // script.async = true;
    // script.crossOrigin = "anonymous";
    // document.body.appendChild(script);
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="container mx-auto py-4 px-4 md:px-6">
        <Card className="bg-muted/30">
            <CardContent className="p-4 flex items-center justify-center min-h-[100px]">
                <div className="text-center text-muted-foreground text-sm">
                    <p className="font-semibold">Advertisement</p>
                    <p>Your Google Ad will be displayed here.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
