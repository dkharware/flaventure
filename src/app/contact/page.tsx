'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { sendContactMessage } from '@/app/actions/contact';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactPage() {
  const initialState = {
    message: null,
    errors: {},
  };
  const [state, formAction] = useFormState(sendContactMessage, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: 'Success!',
        description: state.message,
      });
    } else if (state.errors && Object.keys(state.errors).length > 0) {
        const errorMessages = Object.values(state.errors).flat().join('\n');
        toast({
            variant: 'destructive',
            title: 'Oops! Something went wrong.',
            description: errorMessages,
        });
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline">Contact Us</CardTitle>
          <CardDescription>
            Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="John" required />
                 {state?.errors?.firstName && <p className="text-sm text-destructive">{state.errors.firstName.join(', ')}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="Doe" required />
                 {state?.errors?.lastName && <p className="text-sm text-destructive">{state.errors.lastName.join(', ')}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="contact@shopifydevguide.com" required />
              {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email.join(', ')}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message..." rows={5} required />
              {state?.errors?.message && <p className="text-sm text-destructive">{state.errors.message.join(', ')}</p>}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}