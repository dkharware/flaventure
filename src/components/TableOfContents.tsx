
'use client';

import { useEffect, useState, useRef } from 'react';
import { slugify } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const foundHeadings: Heading[] = [];
    tempDiv.querySelectorAll('h2').forEach((h) => {
      const text = h.textContent || '';
      const id = slugify(text);
      if (text) {
        foundHeadings.push({ id, text, level: 2 });
      }
    });
    setHeadings(foundHeadings);
  }, [content]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    elements.forEach(el => observer.current?.observe(el!));

    return () => observer.current?.disconnect();
  }, [headings]);
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', `#${id}`);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="toc">
        <AccordionTrigger className="text-lg font-semibold">
          <div className="flex items-center gap-2">
            <List className="h-5 w-5" />
            Table of Contents
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2 text-sm pl-2 pt-2">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleLinkClick(e, h.id)}
                  className={cn(
                    'transition-colors hover:text-primary block border-l-2 pl-4',
                    activeId === h.id ? 'text-primary font-semibold border-primary' : 'text-muted-foreground border-transparent'
                  )}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
