
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { ClipboardCopy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactDOM from 'react-dom';
import React from 'react';
import { slugify } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast({
        title: 'Copied!',
        description: 'Code has been copied to your clipboard.',
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        variant: 'destructive',
        title: 'Failed to copy',
        description: 'Could not copy code to clipboard.',
      });
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleCopy}
      className="absolute top-2 right-2 h-8 w-8"
      aria-label="Copy code to clipboard"
    >
      {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
    </Button>
  );
};

interface FaqItem {
  question: string;
  answer: string;
}

export function ArticleContent({ content, faqContent }: { content: string, faqContent?: string | null }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const mainContentElement = contentRef.current;
    const portals: { container: Element, component: React.ReactElement }[] = [];

    // Add IDs to headings for ToC
    const headingElements = mainContentElement.querySelectorAll('h2, h3');
    headingElements.forEach(h => {
        const text = h.textContent || '';
        if (text) {
            h.id = slugify(text);
        }
    });

    // Add copy buttons to pre elements
    const preElements = mainContentElement.querySelectorAll('pre');
    preElements.forEach((pre) => {
      const code = pre.querySelector('code');
      const textToCopy = code?.innerText || '';

      if (pre.querySelector('.copy-button-container')) return;
      
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'copy-button-container';
      pre.appendChild(buttonContainer);
      
      portals.push({
        container: buttonContainer,
        component: <CopyButton textToCopy={textToCopy} />
      });
    });
    
    // Extract FAQs from metafield content if it exists
    if (faqContent) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = faqContent;
      
      const extractedFaqs: FaqItem[] = [];
      const questionElements = tempDiv.querySelectorAll('h3, h4');

      questionElements.forEach(qElement => {
        const question = qElement.textContent?.trim();
        let nextElement = qElement.nextElementSibling;
        let answerHtml = '';

        while (nextElement && !['H3', 'H4'].includes(nextElement.tagName)) {
          answerHtml += nextElement.outerHTML;
          nextElement = nextElement.nextElementSibling;
        }

        if (question && answerHtml) {
          extractedFaqs.push({ question, answer: answerHtml });
        }
      });
      setFaqs(extractedFaqs);
    }
    
    portals.forEach(({container, component}) => {
        ReactDOM.render(component, container);
    });

    return () => {
        portals.forEach(({container}) => {
            if (container.parentNode) {
              ReactDOM.unmountComponentAtNode(container);
              container.remove();
            }
        });
    };
  }, [content, faqContent]);
  

  return (
    <>
        <div
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: content }}
        />
        {faqs.length > 0 && (
            <div className="mt-12 not-prose">
                 <h2 className="text-3xl font-bold font-headline mb-6 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`faq-${index}`} key={index}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        )}
    </>
  );
}
