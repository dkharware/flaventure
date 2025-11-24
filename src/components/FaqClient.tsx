
'use client';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from './ui/card';

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
            <div className="md:col-span-1">
                {/* Mobile view: Carousel */}
                <div className="md:hidden -mx-4">
                    <Carousel
                        opts={{
                            align: "start",
                            dragFree: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="px-4">
                            {faqData.map(item => (
                                <CarouselItem key={item.category} className="basis-auto">
                                     <Button 
                                        variant={activeCategory === item.category ? 'default' : 'outline'}
                                        onClick={() => setActiveCategory(item.category)}
                                        className="w-full justify-start"
                                    >
                                        {item.category}
                                    </Button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                
                {/* Desktop view: Vertical buttons */}
                <div className="hidden md:flex md:flex-col md:gap-2">
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
            </div>
            <div className="md:col-span-3 mt-4 md:mt-0">
                <Accordion type="single" collapsible className="w-full" defaultValue={activeFaqs[0]?.question}>
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
  