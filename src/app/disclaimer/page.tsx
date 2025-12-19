
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function DisclaimerPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container mx-auto py-8 md:py-12 px-6 md:px-10">
      <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground prose">
          <p>Last updated: {lastUpdated}</p>
          
          <p>
            The information provided by Flaventure ("we," "us," or "our") on this website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h3 className="text-xl font-headline text-foreground">External Links Disclaimer</h3>
          <p>
            The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
          </p>

          <h3 className="text-xl font-headline text-foreground">Affiliate Disclaimer</h3>
          <p>
            This site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include but are not limited to, travel booking sites, Amazon Associates, and various travel gear companies.
          </p>

          <h3 className="text-xl font-headline text-foreground">Professional Disclaimer</h3>
          <p>
            The travel and food information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. The use or reliance of any information contained on this site is solely at your own risk.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
