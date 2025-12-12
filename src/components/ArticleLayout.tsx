
'use client';

import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { SidebarOpen, SidebarClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ArticleLayoutProps {
  leftSidebar: ReactNode;
  mainContent: ReactNode;
  rightSidebar: ReactNode;
}

export function ArticleLayout({ leftSidebar, mainContent, rightSidebar }: ArticleLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {isSidebarOpen && (
            <aside className="hidden lg:block lg:col-span-3">
                {leftSidebar}
            </aside>
        )}
        <main className={cn(
            "transition-all duration-300",
            isSidebarOpen ? "lg:col-span-6" : "lg:col-span-9"
        )}>
          {mainContent}
        </main>
        <aside className="lg:col-span-3 relative">
          {rightSidebar}
        </aside>
      </div>
      <div className="hidden lg:block absolute -left-16 top-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="sticky top-28"
                >
                    {isSidebarOpen ? <SidebarClose className="h-5 w-5" /> : <SidebarOpen className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isSidebarOpen ? 'Hide ToC' : 'Show ToC'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
      </div>
    </div>
  );
}
