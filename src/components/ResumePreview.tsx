'use client';

import React, { useRef } from 'react';
import { useResume } from './Editor';
import { Download } from 'lucide-react';
import { ProfessionalTemplate } from './templates/Professional';
import { CreativeTemplate } from './templates/Creative';
import { ModernTemplate } from './templates/Modern';
import { MinimalistTemplate } from './templates/Minimalist';
import { AcademicTemplate } from './templates/Academic';
import { CompactTemplate } from './templates/Compact';
import { DeveloperTemplate } from './templates/Developer';
import { EntryLevelTemplate } from './templates/EntryLevel';
import { ExecutiveTemplate } from './templates/Executive';
import { InfographicTemplate } from './templates/Infographic';
import { PortfolioTemplate } from './templates/Portfolio';
import { SalesTemplate } from './templates/Sales';
import { TimelineTemplate } from './templates/Timeline';
import { TwoColumnTemplate } from './templates/TwoColumn';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

const templateComponents: { [key: string]: React.ComponentType<any> } = {
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  modern: ModernTemplate,
  minimalist: MinimalistTemplate,
  academic: AcademicTemplate,
  compact: CompactTemplate,
  developer: DeveloperTemplate,
  'entry-level': EntryLevelTemplate,
  executive: ExecutiveTemplate,
  infographic: InfographicTemplate,
  portfolio: PortfolioTemplate,
  sales: SalesTemplate,
  timeline: TimelineTemplate,
  'two-column': TwoColumnTemplate,
};

export default function ResumePreview() {
  const { resumeData, templateId } = useResume();
  const componentToPrintRef = useRef<HTMLDivElement>(null);
  const TemplateComponent = templateComponents[templateId];

  return (
    <>
      <div className="bg-gray-100 min-h-full" id="preview-area">
        <div className="p-4 lg:p-8 pt-2">
            <div id="printable-area" className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div ref={componentToPrintRef} className="w-full aspect-[210/297]">
                    {TemplateComponent ? <TemplateComponent /> : <div>Template not found</div>}
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
