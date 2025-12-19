'use client';

import { useEffect, useRef, useState } from 'react';
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

export function ArticleContent({ content }: { content: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const contentElement = contentRef.current;
    if (!contentElement) return;
    
    // Create a temporary div to parse the content without affecting the DOM
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Add IDs to headings for ToC
    const headingElements = tempDiv.querySelectorAll('h2, h3');
    headingElements.forEach(h => {
        const text = h.textContent || '';
        if (text) {
            h.id = slugify(text);
        }
    });

    // FAQ Extraction
    const faqHeading = Array.from(tempDiv.querySelectorAll('h2, h3')).find(h => 
        h.textContent?.toLowerCase().includes('frequently asked questions') ||
        h.textContent?.toLowerCase().includes('faq')
    );

    if (faqHeading) {
        const extractedFaqs: FaqItem[] = [];
        let currentNode = faqHeading.nextElementSibling;
        let currentQuestion = '';
        let currentAnswer = '';

        while (currentNode) {
            if (currentNode.tagName.match(/H[2-4]/)) {
                if (currentQuestion && currentAnswer) {
                    extractedFaqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
                }
                currentQuestion = currentNode.textContent || '';
                currentAnswer = '';
            } else if (currentQuestion) {
                currentAnswer += currentNode.outerHTML;
            }
            
            // If the next sibling is an H2 (potentially a new major section), stop processing.
            if (currentNode.nextElementSibling?.tagName === 'H2') {
                 if (currentQuestion && currentAnswer) {
                    extractedFaqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
                }
                break;
            }
            
            currentNode = currentNode.nextElementSibling;
        }
        if (currentQuestion && currentAnswer) {
             extractedFaqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
        }
        
        if (extractedFaqs.length > 0) {
            setFaqs(extractedFaqs);
            // Hide the original FAQ section
            let elementToHide = faqHeading;
            while(elementToHide) {
                (elementToHide as HTMLElement).style.display = 'none';
                 if (elementToHide.nextElementSibling?.tagName === 'H2') break;
                elementToHide = elementToHide.nextElementSibling as HTMLElement;
            }
        }
    }
    
    // Add copy buttons to pre elements
    const preElements = tempDiv.querySelectorAll('pre');
    preElements.forEach((pre) => {
      const code = pre.querySelector('code');
      const textToCopy = code?.innerText || '';

      if (pre.querySelector('.copy-button-container')) return;
      
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'copy-button-container';
      pre.appendChild(buttonContainer);

      ReactDOM.render(<CopyButton textToCopy={textToCopy} />, buttonContainer);
    });

    // Update the actual content
    if(contentRef.current) {
        contentRef.current.innerHTML = tempDiv.innerHTML;
    }

    // Cleanup on unmount
    return () => {
      preElements.forEach(pre => {
        const container = pre.querySelector('.copy-button-container');
        if (container) {
          ReactDOM.unmountComponentAtNode(container);
          container.remove();
        }
      });
    };
  }, [content, isClient]);

  return (
    <>
        <div
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: content }}
        />
        {faqs.length > 0 && (
            <div className="mt-12">
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
