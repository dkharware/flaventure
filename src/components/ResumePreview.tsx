'use client';

import React, { useRef } from 'react';
import { useResume } from './Editor';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ProfessionalTemplate } from './templates/Professional';
import { CreativeTemplate } from './templates/Creative';
import { ModernTemplate } from './templates/Modern';
import { MinimalistTemplate } from './templates/Minimalist';

const templateComponents: { [key: string]: React.ComponentType } = {
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  modern: ModernTemplate,
  minimalist: MinimalistTemplate,
};

export default function ResumePreview() {
  const { templateId } = useResume();
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'resume',
  });

  const TemplateComponent = templateComponents[templateId];

  return (
    <div className="sticky top-0">
      <div className="flex justify-end mb-4">
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-2">
        <div ref={componentRef} className="w-full aspect-[210/297]">
          {TemplateComponent ? <TemplateComponent /> : <div>Template not found</div>}
        </div>
      </div>
    </div>
  );
}
