
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

const mockComments: Comment[] = [
    { id: 1, author: 'Jane Doe', avatar: '/avatars/01.png', text: 'This was such a helpful article, thank you for sharing!', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
    { id: 2, author: 'John Smith', avatar: '/avatars/02.png', text: 'Great insights on headless Shopify. I\'m planning to use Next.js for my next project.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
];

const CommentTime = ({ timestamp }: { timestamp: Date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    // This runs only on the client, after hydration
    setTimeAgo(formatDistanceToNow(timestamp, { addSuffix: true }));
  }, [timestamp]);

  if (!timeAgo) {
      // Render a placeholder on the server and initial client render
      return null;
  }

  return (
    <p className="text-xs text-muted-foreground">
        {timeAgo}
    </p>
  );
};


export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState({ author: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author || !newComment.text) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        const commentToAdd: Comment = {
            id: Math.random(),
            author: newComment.author,
            avatar: `/avatars/${(Math.floor(Math.random() * 5) + 1).toString().padStart(2, '0')}.png`,
            text: newComment.text,
            timestamp: new Date(),
        };

        setComments(prev => [commentToAdd, ...prev]);
        setNewComment({ author: '', text: '' });
        setIsSubmitting(false);
    }, 500);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold font-headline mb-8 text-center">Join the Discussion</h2>
      
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="author">Your Name</Label>
                <Input 
                    id="author" 
                    value={newComment.author} 
                    onChange={e => setNewComment({ ...newComment, author: e.target.value })}
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="comment">Your Comment</Label>
                <Textarea
                    id="comment"
                    value={newComment.text}
                    onChange={e => setNewComment({ ...newComment, text: e.target.value })}
                    placeholder="Write your comment here..."
                    rows={4}
                    required
                />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </Button>
        </form>

        <div className="space-y-6">
            <h3 className="font-semibold text-lg">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h3>
            {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{comment.author}</p>
                    <CommentTime timestamp={comment.timestamp} />
                </div>
                <p className="text-muted-foreground mt-1">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
