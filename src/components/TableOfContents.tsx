
'use client';

import { useEffect, useState, useRef } from 'react';
import { slugify } from '@/lib/utils';
import { cn } from '@/lib/utils';

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
      const level = Number(h.tagName.substring(1));
      if (text) {
        foundHeadings.push({ id, text, level });
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
    // Update URL hash without causing a page reload
    history.pushState(null, '', `#${id}`);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-28">
      <h3 className="font-headline font-semibold text-lg mb-2">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => handleLinkClick(e, h.id)}
              className={cn(
                'transition-colors hover:text-primary',
                activeId === h.id ? 'text-primary font-semibold' : 'text-muted-foreground'
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
