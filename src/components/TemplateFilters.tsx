'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TemplateCard } from '@/components/TemplateCard';
import type { Template } from '@/lib/types';

interface TemplateFiltersProps {
  templates: Template[];
  categories: string[];
}

export function TemplateFilters({ templates, categories }: TemplateFiltersProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeFilter, setActiveFilter] = useState(initialCategory);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categories.includes(category)) {
      setActiveFilter(category);
    } else {
      setActiveFilter('All');
    }
  }, [searchParams, categories]);

  const filteredTemplates = activeFilter === 'All'
    ? templates
    : templates.filter(template => template.category === activeFilter);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeFilter === category ? 'default' : 'outline'}
            onClick={() => setActiveFilter(category)}
            className="capitalize rounded-full px-6"
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTemplates.map(template => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </div>
    </>
  );
}
