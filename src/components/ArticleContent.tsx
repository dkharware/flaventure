
'use client';

import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ClipboardCopy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactDOM from 'react-dom';
import React from 'react';
import { slugify } from '@/lib/utils';

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
  
  useEffect(() => {
    if (!contentRef.current) return;

    const mainContentElement = contentRef.current;
    const portals: { container: Element, component: React.ReactElement }[] = [];

    const headingElements = mainContentElement.querySelectorAll('h2, h3');
    headingElements.forEach(h => {
        const text = h.textContent || '';
        if (text) {
            h.id = slugify(text);
        }
    });

    const imageElements = mainContentElement.querySelectorAll('img');
    imageElements.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });

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
            if (container.parentNode) {
              ReactDOM.unmountComponentAtNode(container);
              container.remove();
            }
        });
    };
  }, [content]);

  return (
    <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
