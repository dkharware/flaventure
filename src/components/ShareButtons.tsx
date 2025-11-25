
'use client';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
}

const siteUrl = 'https://easyfreecv.com';

export function ShareButtons({ title }: ShareButtonsProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const fullUrl = `${siteUrl}${pathname}`;

  const shareOptions = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      toast({
        title: 'Link Copied!',
        description: 'The article link has been copied to your clipboard.',
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        variant: 'destructive',
        title: 'Failed to copy',
        description: 'Could not copy the link.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      {shareOptions.map((option) => (
        <Button key={option.name} variant="outline" size="icon" asChild>
          <a href={option.url} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${option.name}`}>
            {option.icon}
          </a>
        </Button>
      ))}
      <Button variant="outline" size="icon" onClick={handleCopyLink} aria-label="Copy link">
        {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <LinkIcon className="h-5 w-5" />}
      </Button>
    </div>
  );
}
