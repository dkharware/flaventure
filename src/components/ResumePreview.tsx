'use client';

import React,  { useRef, useState } from 'react';
import { useResume } from './Editor';
import { Download, Bot } from 'lucide-react';
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
import { uploadFile } from '@/app/actions/blob';
import html2canvas from 'html2canvas';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { getResumeAnalysis } from '@/app/actions/ai';
import type { ResumeAnalysisOutput } from '@/lib/ai-schemas';
import { ResumeAnalysisSheet } from './ResumeAnalysisSheet';

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisSheetOpen, setIsAnalysisSheetOpen] = useState(false);
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisOutput | null>(null);

  const { toast } = useToast();
  const componentToPrintRef = useRef<HTMLDivElement>(null);
  const TemplateComponent = templateComponents[templateId];


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
      const imgDataUri = canvas.toDataURL('image/png');
      
      const fileName = `Resume-${resumeData.personalInfo.name.replace(/\s/g, '_')}-${templateId}.png`;
      
      const uploadResult = await uploadFile('resume', imgDataUri, fileName);

      if (uploadResult?.error) {
        throw new Error(uploadResult.error);
      }
      
      const link = document.createElement('a');
      link.href = imgDataUri;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Success!',
        description: 'Your resume has been saved and downloaded.',
      });

    } catch (error) {
      console.error('Failed to save or download resume:', error);
       toast({
        variant: 'destructive',
        title: 'Error',
        description: `Could not save or download. ${error instanceof Error ? error.message : ''}`,
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAnalysis() {
    setIsAnalyzing(true);
    const result = await getResumeAnalysis(resumeData, jobDescription);
    if (result?.analysis) {
        setAnalysisResult(result.analysis);
        setIsAnalysisSheetOpen(true);
    } else {
        toast({
            variant: 'destructive',
            title: 'Analysis Failed',
            description: result?.error || 'An unknown error occurred.',
        });
    }
    setIsJdModalOpen(false);
    setIsAnalyzing(false);
  }

  return (
    <>
      <div className="bg-gray-100 min-h-full" id="preview-area">
         <div className="p-4 flex justify-center items-center gap-2 no-print">
            <Button
                onClick={handleSaveAndDownload}
                disabled={isSaving}
                className="gap-2"
            >
                <Download size={16} />
                {isSaving ? 'Saving...' : 'Save & Download'}
            </Button>
            <Button
                variant="outline"
                onClick={() => setIsJdModalOpen(true)}
                disabled={isAnalyzing}
                className="gap-2"
            >
                <Bot size={16} />
                {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </Button>
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
      
      <Dialog open={isJdModalOpen} onOpenChange={setIsJdModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Analyze Resume Against Job Description</DialogTitle>
                <DialogDescription>
                    Paste the job description below to get an AI-powered analysis of how well your resume matches the role.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="job-description">Job Description</Label>
                    <Textarea
                        id="job-description"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here..."
                        rows={12}
                    />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleAnalysis} disabled={isAnalyzing || !jobDescription}>
                    {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ResumeAnalysisSheet 
        analysis={analysisResult} 
        isOpen={isAnalysisSheetOpen} 
        onClose={() => setIsAnalysisSheetOpen(false)} 
      />
    </>
  );
}
