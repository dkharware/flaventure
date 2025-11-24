'use client';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Button } from './ui/button';

interface Faq {
    question: string;
    answer: string;
}

interface FaqCategory {
    category: string;
    questions: Faq[];
}

interface FaqClientProps {
    faqData: FaqCategory[];
}

export function FaqClient({ faqData }: FaqClientProps) {
    const [activeCategory, setActiveCategory] = React.useState(faqData[0].category);
    const activeFaqs = faqData.find(c => c.category === activeCategory)?.questions || [];
  
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 flex flex-row md:flex-col gap-2">
                {faqData.map(item => (
                    <Button 
                        key={item.category}
                        variant={activeCategory === item.category ? 'default' : 'outline'}
                        onClick={() => setActiveCategory(item.category)}
                        className="w-full justify-start"
                    >
                        {item.category}
                    </Button>
                ))}
            </div>
            <div className="md:col-span-3">
                <Accordion type="single" collapsible className="w-full">
                    {activeFaqs.map((faq) => (
                        <AccordionItem value={faq.question} key={faq.question}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
      );
  }
  