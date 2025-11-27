
'use client';

import { useState, useRef, useEffect, memo, Suspense, lazy } from 'react';
import { Button } from './ui/button';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useChat } from '@/context/ChatContext';

const ChatPanel = lazy(() => import('./ChatPanel'));

export function ChatWidget() {
  const { isChatOpen, setIsChatOpen } = useChat();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This component will only be interactive (and thus its children rendered) on the client.
    // We delay mounting the interactive parts to avoid hydration issues and to defer JS loading.
    if (isChatOpen) {
      setIsMounted(true);
    }
  }, [isChatOpen]);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 transition-all duration-300 md:bottom-6 md:right-6">
        <Button 
          size="icon" 
          onClick={() => setIsChatOpen(prev => !prev)} 
          className="w-14 h-14 rounded-full shadow-lg"
          aria-label="Toggle chat widget"
        >
          {isChatOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
        </Button>
      </div>
      
      {isMounted && (
        <Suspense fallback={
            <div className="fixed bottom-24 right-4 w-[350px] h-[500px] bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl animate-pulse md:bottom-24 md:right-6"></div>
        }>
            <ChatPanel isOpen={isChatOpen} />
        </Suspense>
      )}
    </>
  );
}
