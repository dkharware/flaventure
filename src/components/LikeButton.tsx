
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // This effect runs only on the client, after hydration
    setLikeCount(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleLike = () => {
    if (likeCount === null) return;

    if (!liked) {
      setLiked(true);
      setLikeCount(prev => (prev || 0) + 1);
      toast({
        title: 'Thank you!',
        description: "You've liked this article.",
      });
    } else {
      setLiked(false);
      setLikeCount(prev => (prev || 0) - 1);
    }
  };

  return (
    <Button variant="outline" onClick={handleLike} className="group">
      <Heart
        className={cn(
          'h-5 w-5 mr-2 transition-all',
          liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground group-hover:text-red-500'
        )}
      />
      <span className={cn('font-medium', liked ? 'text-primary' : 'text-muted-foreground')}>
        {likeCount !== null ? `${likeCount} Likes` : 'Like'}
      </span>
    </Button>
  );
}
