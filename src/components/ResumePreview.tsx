'use client';

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
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
  const { templateId } = useResume();
  const componentToPrintRef = useRef<HTMLDivElement>(null);
  const TemplateComponent = templateComponents[templateId];

  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: `${personalInfo.name} - Resume`,
    onAfterPrint: () => console.log('Printed successfully!'),
  });

  const { resumeData: { personalInfo } } = useResume();

  return (
    <div className="bg-gray-100 min-h-full" id="preview-area">
      <div className="sticky top-0 bg-gray-100 z-10 p-4 lg:p-8 pb-4">
        <div className="flex justify-end">
          <button onClick={handlePrint} className={cn(buttonVariants())}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="p-4 lg:p-8 pt-0">
          <div ref={componentToPrintRef} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="w-full aspect-[210/297]">
                  {TemplateComponent ? <TemplateComponent /> : <div>Template not found</div>}
              </div>
          </div>
      </div>
    </div>
  );
}

    