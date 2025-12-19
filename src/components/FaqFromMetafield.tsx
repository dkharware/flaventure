
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface FaqFromMetafieldProps {
  htmlContent: string;
}

// This component is no longer used for structured FAQ data.
// It can be removed or repurposed if needed.
export function FaqFromMetafield({ htmlContent }: FaqFromMetafieldProps) {
  if (!htmlContent) {
    return null;
  }

  // Basic fallback to render HTML content if it's not structured JSON.
  return (
      <Card className="bg-background/50 backdrop-blur-lg">
          <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </CardContent>
      </Card>
  );
}
