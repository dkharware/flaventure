'use client';

import React from 'react';
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
  const TemplateComponent = templateComponents[templateId];

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          #printable-resume {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            border: none;
            box-shadow: none;
            transform: scale(1);
            background-color: #fff;
          }
           @page {
            size: A4;
            margin: 0;
          }
        }
        #editor-form {
          display: none;
        }
        #preview-area {
          background-color: #f3f4f6;
        }
      `}</style>
      <div className="bg-gray-100 min-h-full" id="preview-area">
        <div className="sticky top-0 bg-gray-100 z-10 no-print">
          <div className="flex justify-end p-4 lg:p-8 pb-4">
            <button onClick={handlePrint} className={cn(buttonVariants())}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
        
        <div className="p-4 lg:p-8 pt-0">
            <div id="printable-resume" className="bg-white shadow-lg rounded-lg">
                <div className="w-full aspect-[210/297] overflow-hidden">
                    {TemplateComponent ? <TemplateComponent /> : <div>Template not found</div>}
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
