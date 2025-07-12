'use client';

import React, { useRef, forwardRef } from 'react';
import { useResume } from './Editor';
import { useReactToPrint } from 'react-to-print';
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

// A separate component for printing to isolate the ref and avoid issues with re-renders.
const PrintableResume = forwardRef<HTMLDivElement, { component: React.ReactNode }>(({ component }, ref) => {
    if (!component) return null;
    // Clone the component to attach the ref directly to it.
    return React.cloneElement(component as React.ReactElement, { ref });
});
PrintableResume.displayName = 'PrintableResume';


export default function ResumePreview() {
  const { templateId } = useResume();
  const componentToPrintRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: 'resume',
  });

  const TemplateComponent = templateComponents[templateId];

  return (
    <div className="sticky top-0">
      <div className="flex justify-end mb-4">
        <button onClick={handlePrint} className={cn(buttonVariants())}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </button>
      </div>
      
      {/* Hidden component for printing */}
      <div className="hidden">
        <PrintableResume component={TemplateComponent ? <TemplateComponent /> : null} ref={componentToPrintRef} />
      </div>

      {/* Visible component for preview */}
      <div className="bg-white shadow-lg rounded-lg p-2">
        <div className="w-full aspect-[210/297]">
          {TemplateComponent ? <TemplateComponent /> : <div>Template not found</div>}
        </div>
      </div>
    </div>
  );
}