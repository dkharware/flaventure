'use client';

import React, { useState, createContext, useContext, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import type { ResumeData } from '@/lib/types';
import { initialData } from '@/lib/initial-data';

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  templateId: string;
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export default function Editor({ templateId }: { templateId: string }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  const contextValue = useMemo(() => ({
    resumeData,
    setResumeData,
    templateId
  }), [resumeData, setResumeData, templateId]);

  return (
    <ResumeContext.Provider value={contextValue}>
      <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] xl:grid-cols-[500px_1fr] min-h-[calc(100vh-81px)]">
        <div className="bg-card border-r overflow-y-auto no-print" id="editor-form">
          <ResumeForm />
        </div>
        <ResumePreview />
      </div>
    </ResumeContext.Provider>
  );
}
