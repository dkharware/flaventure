'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TemplateCard } from '@/components/TemplateCard';
import type { Template } from '@/lib/types';

interface TemplateFiltersProps {
  templates: Template[];
  categories: string[];
}

export function TemplateFilters({ templates, categories }: TemplateFiltersProps) {
  const [activeFilter, setActiveFilter] = useState('All');

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
