
'use client';

import Link from 'next/link';
import type { Template } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PenSquare, Briefcase, Paintbrush, FileText, Sparkles, GraduationCap, Code, User, Mail, LucideProps } from 'lucide-react';
import React from 'react';
import { ProfessionalTemplate } from './templates/Professional';
import { CreativeTemplate } from './templates/Creative';
import { ModernTemplate } from './templates/Modern';
import { MinimalistTemplate } from './templates/Minimalist';
import { ResumeData } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { ResumeProvider } from './Editor';

const templateComponents: { [key: string]: React.ComponentType<any> } = {
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  modern: ModernTemplate,
  minimalist: MinimalistTemplate,
  // Add other templates here as needed for preview
};

interface TemplatePreviewModalProps {
  template: Template;
  onClose: () => void;
}

export function TemplatePreviewModal({ template, onClose }: TemplatePreviewModalProps) {
  const { id, name, category } = template;
  const isCoverLetter = category === 'Cover Letter';
  const editUrl = isCoverLetter ? `/cover-letter-editor/${id}` : `/editor/${id}`;
  
  const PreviewComponent = templateComponents[id];

  const resumeContextValue = {
    resumeData: initialData,
    setResumeData: (() => {}) as React.Dispatch<React.SetStateAction<ResumeData>>,
    templateId: id
  };

  return (
    <Dialog open={!!template} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{category} Template Preview</DialogDescription>
        </DialogHeader>
        <div className="my-4 flex-grow overflow-auto border rounded-md">
          {PreviewComponent ? (
             <ResumeProvider value={resumeContextValue}>
                <div className="w-full aspect-[210/297] origin-top scale-[0.9] lg:scale-[0.8] xl:scale-[0.65] -translate-y-16 lg:-translate-y-24 xl:-translate-y-32">
                    <PreviewComponent />
                </div>
             </ResumeProvider>
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">Live preview not available for this template.</p>
             </div>
          )}
        </div>
        <DialogFooter>
           <Button variant="outline" onClick={onClose}>Close</Button>
          <Button asChild size="lg">
            <Link href={editUrl}>
              <PenSquare className="mr-2 h-4 w-4" /> Use This Template
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Minimal context provider for preview
const ResumeContext = React.createContext<any>(null);
const ResumeProvider = ({ children, value }: { children: React.ReactNode, value: any }) => (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
);
// Minimal hook for preview components
export const useResume = () => React.useContext(ResumeContext);
