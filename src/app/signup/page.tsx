
'use client';
import { useActionState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signup } from '@/app/actions/user';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const [state, formAction] = useActionState(signup, null);
  const { toast } = useToast();

   useEffect(() => {
    if (state?.errors?.general) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: state.errors.general,
      });
    }
  }, [state, toast]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>Join easyfreecv to build your professional resume in minutes.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="John Doe" required />
              {state?.errors?.fullName && <p className="text-sm text-destructive">{state.errors.fullName.join(', ')}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="contact@easyfreecv.com" required />
              {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email.join(', ')}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state?.errors?.password && <p className="text-sm text-destructive">{state.errors.password.join(', ')}</p>}
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
