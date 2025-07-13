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
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { uploadFile } from '@/app/actions/blob';

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
    const input = componentToPrintRef.current;
    if (!input) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not find the resume content to download.',
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const canvas = await html2canvas(input, {
        scale: 2, // Higher scale for better quality
        useCORS: true, 
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      const fileName = `Resume-${resumeData.personalInfo.name.replace(/\s/g, '_')}-${templateId}.pdf`;
      const pdfBlob = pdf.output('blob');

      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }
      
      await db.addResume({ url: result.url, name: fileName, createdAt: new Date() });

      toast({
        title: 'Success!',
        description: 'Your resume has been saved.',
      });
      
      pdf.save(fileName);

    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate the PDF. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  async function handleSaveAndDownload() {
    const input = componentToPrintRef.current;
    if (!input) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not find the resume content to download.',
      });
      return;
    }

    setIsSaving(true);
    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      const fileName = `Resume-${resumeData.personalInfo.name.replace(/\s/g, '_')}-${templateId}.pdf`;
      const pdfBlob = pdf.output('blob');
      
      // Create a file object from the blob
      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
      
      // Use FileReader to get base64 representation
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        await uploadFile('resume', base64data, fileName);
        pdf.save(fileName);
         toast({
          title: 'Success!',
          description: 'Your resume has been saved and downloaded.',
        });
      };

    } catch (error) {
      console.error('Failed to save or download resume:', error);
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save or download the PDF. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <div className="bg-gray-100 min-h-full" id="preview-area">
         <div className="p-4 flex justify-center no-print">
            <button
                onClick={handleSaveAndDownload}
                disabled={isSaving}
                className={cn(buttonVariants({ variant: 'default' }), 'gap-2')}
            >
                <Download size={16} />
                {isSaving ? 'Generating PDF...' : 'Save & Download PDF'}
            </button>
        </div>
        <div className="p-4 lg:p-8 pt-2">
            <div id="printable-area" className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div ref={componentToPrintRef} className="w-full aspect-[210/297]">
                    <div className="p-2">
                        {TemplateComponent ? <TemplateComponent /> : <div>Template not found</div>}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}