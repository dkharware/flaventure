'use client';

import React,  { useRef, useState } from 'react';
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
import { uploadFile } from '@/app/actions/blob';
import { useToast } from '@/hooks/use-toast';


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
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const componentToPrintRef = useRef<HTMLDivElement>(null);
  const TemplateComponent = templateComponents[templateId];

  const handleDownload = async () => {
    setIsSaving(true);
    const printableElement = document.getElementById('printable-area');
    if (!printableElement) {
        setIsSaving(false);
        return;
    }

    window.print();

    // The file upload needs to happen after the print dialog is closed.
    // We can use a timeout to simulate this.
    setTimeout(async () => {
      try {
        const fileContent = printableElement.outerHTML;
        const fileName = `Resume-${resumeData.personalInfo.name.replace(/\s/g, '_')}-${Date.now()}.pdf`;
        
        await uploadFile('resume', fileContent, fileName);

        toast({
          title: 'Success!',
          description: 'Your resume has been saved and is ready for download.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not save your resume. Please try again.',
        });
      } finally {
        setIsSaving(false);
      }
    }, 1000); // 1 second delay
  };

  return (
    <>
       <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-area, #printable-area * {
            visibility: visible;
          }
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transform-origin: top left;
            transform: scale(1.18);
          }
           .no-print {
            display: none !important;
          }
        }
      `}</style>
      <div className="bg-gray-100 min-h-full" id="preview-area">
         <div className="p-4 flex justify-center no-print">
            <button
                onClick={handleDownload}
                disabled={isSaving}
                className={cn(buttonVariants({ variant: 'default' }), 'gap-2')}
            >
                <Download size={16} />
                {isSaving ? 'Saving...' : 'Save and Download PDF'}
            </button>
        </div>
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