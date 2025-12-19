
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);


  return (
    <div className="container mx-auto py-8 md:py-12 px-6 md:px-10">
      <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground prose">
          <p>Last updated: {lastUpdated}</p>
          
          <p>
            Flaventure ("us", "we", or "our") operates the Flaventure website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <h3 className="text-xl font-headline text-foreground">Information Collection and Use</h3>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>

          <h3 className="text-xl font-headline text-foreground">Log Data</h3>
          <p>
            We may also collect information that your browser sends whenever you visit our Service ("Log Data"). This LogData may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
          </p>

          <h3 className="text-xl font-headline text-foreground">Cookies</h3>
          <p>
            Cookies are files with a small amount of data, which may include an anonymous unique identifier. We use cookies to collect information to improve our services for you. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h3 className="text-xl font-headline text-foreground">Changes to This Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
