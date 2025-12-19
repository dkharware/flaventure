
'use client';

import { FaqClient } from '@/components/FaqClient';
import { faqData as allFaqData, FaqCategory } from '@/lib/faq-data';

interface FaqSectionProps {
    filter?: string;
}

export default function FaqSection({ filter }: FaqSectionProps) {

    const filteredData = filter 
        ? allFaqData.filter(category => category.category === filter)
        : allFaqData;

    const dataToShow = filteredData.length > 0 ? filteredData : allFaqData;

    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           Find answers to common questions about Shopify and e-commerce development.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-4xl pt-8">
                   <FaqClient faqData={dataToShow} />
                </div>
            </div>
        </section>
    );
}

    