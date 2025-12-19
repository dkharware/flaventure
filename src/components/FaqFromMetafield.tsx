
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface FaqFromMetafieldProps {
  htmlContent: string;
}

interface FaqItem {
    question: string;
    answer: string;
}

const parseFaqJson = (jsonString: string): FaqItem[] => {
    try {
        const data = JSON.parse(jsonString);
        if (data.type !== 'root' || !Array.isArray(data.children)) {
            return [];
        }

        const faqs: FaqItem[] = [];
        let currentQuestion = '';

        for (const node of data.children) {
            if (node.type === 'heading' && node.level === 3 && node.children[0]?.type === 'text') {
                currentQuestion = node.children[0].value.replace(/^\d+\.\s*/, '').trim(); // Remove numbering like "1. "
            } else if (node.type === 'paragraph' && node.children[0]?.type === 'text' && currentQuestion) {
                faqs.push({
                    question: currentQuestion,
                    answer: node.children[0].value,
                });
                currentQuestion = ''; // Reset for the next pair
            }
        }
        return faqs;

    } catch (error) {
        console.error("Failed to parse FAQ JSON:", error);
        return [];
    }
};

export function FaqFromMetafield({ htmlContent }: FaqFromMetafieldProps) {
  if (!htmlContent) {
    return null;
  }

  const faqItems = parseFaqJson(htmlContent);

  if (faqItems.length === 0) {
      // Fallback for non-JSON or malformed content
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

  return (
    <Card className="bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-headline text-center">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
