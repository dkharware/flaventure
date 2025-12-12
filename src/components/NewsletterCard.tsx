
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function NewsletterCard() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      toast({
        title: 'Subscribed!',
        description: `Thanks for subscribing, ${email}!`,
      });
      setEmail('');
    }
  };

  return (
    <Card className="shadow-2xl rounded-2xl w-full max-w-md mx-auto text-left">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Subscribe Our Weekly Newsletter</CardTitle>
        <CardDescription>
          Regular updates ensure that readers have access to fresh perspectives, making Poster a must-read.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
          <Button type="submit" size="icon" className="h-12 w-12 flex-shrink-0 rounded-lg">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
