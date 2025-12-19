'use client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FaqFromMetafieldProps {
  htmlContent: string;
}

export function FaqFromMetafield({ htmlContent }: FaqFromMetafieldProps) {
  if (!htmlContent) {
    return null;
  }

  // This component now directly renders the HTML content from the metafield.
  // This is more robust than trying to parse it as JSON.
  return (
    <Card className="bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-headline text-center">
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </CardContent>
    </Card>
  );
}
