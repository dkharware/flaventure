
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplatePreviewModal } from '@/components/TemplatePreviewModal';
import type { Template } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TemplateFiltersProps {
  templates: Template[];
  categories: string[];
  colors: string[];
}

const colorMap: { [key: string]: string } = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  black: 'bg-black',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
};

export function TemplateFilters({ templates, categories, colors }: TemplateFiltersProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeColor, setActiveColor] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categories.includes(category)) {
      setActiveCategory(category);
    } else {
      setActiveCategory('All');
    }
  }, [searchParams, categories]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const categoryMatch = activeCategory === 'All' || template.category === activeCategory;
      const colorMatch = activeColor === 'All' || template.color === activeColor;
      return categoryMatch && colorMatch;
    });
  }, [templates, activeCategory, activeColor]);
  
  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className="capitalize rounded-full px-6"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="flex justify-center items-center flex-wrap gap-4 mb-12">
        <span className="font-medium text-sm text-muted-foreground">Filter by color:</span>
        <div className="flex items-center gap-3">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              aria-label={`Filter by ${color}`}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all",
                activeColor === color ? 'border-foreground' : 'border-transparent hover:border-foreground/50',
                color === 'All' ? 'bg-muted text-muted-foreground text-xs flex items-center justify-center' : colorMap[color]
              )}
            >
              {color === 'All' && 'All'}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTemplates.map(template => (
          <TemplateCard key={template.id} {...template} onPreview={handlePreview} />
        ))}
      </div>
      
      {previewTemplate && (
        <TemplatePreviewModal 
          template={previewTemplate} 
          onClose={handleClosePreview} 
        />
      )}
    </>
  );
}
