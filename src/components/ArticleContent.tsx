'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Button } from './ui/button';
import { ClipboardCopy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactDOM from 'react-dom';
import React from 'react';
import { slugify } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

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

// This function now runs on the client
const extractFaqsFromHtml = (html: string): FaqItem[] => {
    if (typeof window === 'undefined') return [];

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const faqHeading = Array.from(tempDiv.querySelectorAll('h2, h3')).find(h => 
        h.textContent?.toLowerCase().includes('frequently asked questions') ||
        h.textContent?.toLowerCase().includes('faq')
    );

    if (!faqHeading) return [];

    const extractedFaqs: FaqItem[] = [];
    let currentNode = faqHeading.nextElementSibling;
    
    while (currentNode) {
        if (currentNode.tagName.match(/H[2-4]/)) {
            let currentQuestion = currentNode.textContent || '';
            let currentAnswer = '';
            let nextSibling = currentNode.nextElementSibling;

            while (nextSibling && !nextSibling.tagName.match(/H[2-4]/)) {
                currentAnswer += nextSibling.outerHTML;
                
                // Stop if we hit the next major section of the page
                if (nextSibling.nextElementSibling?.tagName === 'H2') {
                    break;
                }
                nextSibling = nextSibling.nextElementSibling;
            }

            if (currentQuestion && currentAnswer) {
                extractedFaqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
            }
            
            currentNode = nextSibling;
            if (currentNode?.tagName === 'H2') break;
        } else {
             // If we start and don't immediately find a question heading, move to the next element
            currentNode = currentNode.nextElementSibling;
        }
    }

    return extractedFaqs;
};


export function ArticleContent({ content }: { content: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const faqs = useMemo(() => {
      if (!isClient) return [];
      return extractFaqsFromHtml(content);
  }, [content, isClient]);

  useEffect(() => {
    if (!isClient || !contentRef.current) return;

    const mainContentElement = contentRef.current;
    
    // Portal for rendering buttons
    const portals: { container: Element, component: React.ReactElement }[] = [];

    // Add IDs to headings for ToC
    const headingElements = mainContentElement.querySelectorAll('h2, h3');
    headingElements.forEach(h => {
        const text = h.textContent || '';
        if (text) {
            h.id = slugify(text);
        }
    });

    // Hide the original FAQ section if it was extracted
    if (faqs.length > 0) {
        const faqHeading = Array.from(mainContentElement.querySelectorAll('h2, h3')).find(h => 
            h.textContent?.toLowerCase().includes('frequently asked questions') ||
            h.textContent?.toLowerCase().includes('faq')
        );
        if (faqHeading) {
            let elementToHide: Element | null = faqHeading;
            while(elementToHide) {
                if (elementToHide instanceof HTMLElement) {
                    elementToHide.style.display = 'none';
                }
                 if (elementToHide.nextElementSibling?.tagName === 'H2' || !elementToHide.nextElementSibling) break;
                elementToHide = elementToHide.nextElementSibling;
            }
        }
    }
    
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
    
    portals.forEach(({container, component}) => {
        ReactDOM.render(component, container);
    });

    return () => {
        portals.forEach(({container}) => {
            ReactDOM.unmountComponentAtNode(container);
            container.remove();
        });
    };
  }, [content, isClient, faqs]);
  
  useEffect(() => {
    const faqSection = document.getElementById('fallback-faq');
    if (faqSection) {
        faqSection.style.display = faqs.length > 0 ? 'none' : 'block';
    }
  }, [faqs])

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
