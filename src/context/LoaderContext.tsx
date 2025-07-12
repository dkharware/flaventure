'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PageLoader } from '@/components/PageLoader';

interface LoaderContextType {
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  const value = { showLoader, hideLoader };

  return (
    <LoaderContext.Provider value={value}>
      {isLoading && <PageLoader />}
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader(): LoaderContextType {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
