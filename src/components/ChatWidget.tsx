
'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { Button } from './ui/button';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { getChatResponse } from '@/app/actions/chat';
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';
import { useChat } from '@/context/ChatContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MarkdownContent = memo(({ content }: { content: string }) => {
    const parts = content.split(/(\[.*?\]\(.*?\))/g);
  
    return (
      <p>
        {parts.map((part, i) => {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            const [, text, href] = match;
            return (
              <Link key={i} href={href} className="text-primary underline hover:opacity-80">
                {text}
              </Link>
            );
          }
          return part;
        })}
      </p>
    );
});
MarkdownContent.displayName = 'MarkdownContent';

export function ChatWidget() {
  const { isChatOpen, setIsChatOpen } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        { role: 'assistant', content: "Hello! I'm the easyfreecv assistant. How can I help you find an article?" }
      ]);
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getChatResponse(input);

    if (response.reply) {
      const assistantMessage: Message = { role: 'assistant', content: response.reply };
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      const errorMessage: Message = { role: 'assistant', content: response.error || "Sorry, I couldn't get a response. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={cn("hidden md:block fixed bottom-6 right-6 z-50 transition-all duration-300", isChatOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100')}>
        <Button size="icon" onClick={toggleOpen} className="w-16 h-16 rounded-full shadow-lg">
          <MessageSquare className="w-8 h-8" />
        </Button>
      </div>

      <div className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out",
        isChatOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}>
        <Card className="w-[350px] h-[500px] flex flex-col shadow-2xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-full">
                    <Bot className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                    <CardTitle className="font-headline">AI Assistant</CardTitle>
                    <CardDescription>Ask me anything!</CardDescription>
                 </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleOpen}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                 <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                     {message.role === 'assistant' && <div className="p-2 bg-muted rounded-full self-start"><Bot className="w-5 h-5 text-muted-foreground" /></div>}
                     <div className={cn(
                        "max-w-[80%] rounded-xl px-4 py-2 text-sm", 
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      )}>
                       {message.role === 'assistant' ? <MarkdownContent content={message.content} /> : message.content}
                    </div>
                     {message.role === 'user' && <div className="p-2 bg-muted rounded-full self-start"><User className="w-5 h-5 text-muted-foreground" /></div>}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3 justify-start">
                     <div className="p-2 bg-muted rounded-full self-start"><Bot className="w-5 h-5 text-muted-foreground" /></div>
                     <div className="bg-muted text-muted-foreground max-w-[80%] rounded-xl px-4 py-2 text-sm">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{animationDelay: '0ms'}}></span>
                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{animationDelay: '200ms'}}></span>
                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{animationDelay: '400ms'}}></span>
                        </div>
                     </div>
                   </div>
                )}
                 </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
