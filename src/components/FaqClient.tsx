
'use client';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { Briefcase, Code, FileText, GraduationCap, ShoppingCart } from 'lucide-react';

interface Faq {
    question: string;
    answer: string;
    _question?: string; // To handle the one case in data
}

interface FaqCategory {
    category: string;
    questions: Faq[];
}

interface FaqClientProps {
    faqData: FaqCategory[];
}

const categoryIcons: { [key: string]: React.ReactNode } = {
    "Shopify": <ShoppingCart className="h-6 w-6" />,
    "Theme & App": <Code className="h-6 w-6" />,
    "Storefront API": <FileText className="h-6 w-6" />,
    "Headless Shopify": <Briefcase className="h-6 w-6" />,
};

export function FaqClient({ faqData }: FaqClientProps) {
    const [activeCategory, setActiveCategory] = React.useState(faqData[0].category);
    const activeFaqs = faqData.find(c => c.category === activeCategory)?.questions || [];
  
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
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
                                <CarouselItem key={item.category} className="basis-auto pr-2">
                                     <Card 
                                        onClick={() => setActiveCategory(item.category)}
                                        className={cn(
                                            'cursor-pointer transition-all p-4 flex items-center gap-3',
                                            activeCategory === item.category ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted/50 hover:bg-muted'
                                        )}
                                    >
                                        <div className={cn('transition-colors', activeCategory === item.category ? 'text-primary-foreground' : 'text-primary')}>
                                            {categoryIcons[item.category]}
                                        </div>
                                        <h4 className="font-semibold text-sm">{item.category}</h4>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                
                <div className="hidden md:flex md:flex-col md:gap-3">
                    {faqData.map(item => (
                        <Card 
                            key={item.category}
                            onClick={() => setActiveCategory(item.category)}
                            className={cn(
                                'cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5',
                                activeCategory === item.category ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card hover:bg-muted'
                            )}
                        >
                           <CardContent className="p-4 flex items-center gap-4">
                                <div className={cn('transition-colors', activeCategory === item.category ? 'text-primary-foreground' : 'text-primary')}>
                                    {categoryIcons[item.category]}
                                </div>
                                <h4 className="font-semibold">{item.category}</h4>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="md:col-span-2 mt-4 md:mt-0">
                <Accordion type="single" collapsible className="w-full" defaultValue={activeFaqs[0]?.question}>
                    {activeFaqs.map((faq, index) => (
                        <AccordionItem value={faq.question || faq._question || ''} key={`${activeCategory}-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question || faq._question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
      );
  }
  
