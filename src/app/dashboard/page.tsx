
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const userId = cookieStore.get('session')?.value;

  if (!userId) {
    redirect('/login');
  }

  const user = await db.getUserById(userId);

  if (!user) {
    // This can happen if the user was deleted but the cookie remains.
    redirect('/login');
  }

  // In a real app, you would filter resumes and cover letters by userId
  const resumes = await db.getResumes();
  const coverLetters = await db.getCoverLetters();

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.fullName}! View and manage your saved documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>My Resumes</CardTitle>
            <CardDescription>All your saved resume documents.</CardDescription>
          </CardHeader>
          <CardContent>
            {resumes.length > 0 ? (
              <ul className="space-y-4">
                {resumes.map((resume: any, index: number) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" />
                      <div>
                        <p className="font-semibold">{resume.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Created: {format(new Date(resume.createdAt), 'PPP')}
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={resume.url} target="_blank" rel="noopener noreferrer">
                        View <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">You haven't saved any resumes yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Cover Letters</CardTitle>
            <CardDescription>All your saved cover letter documents.</CardDescription>
          </CardHeader>
          <CardContent>
            {coverLetters.length > 0 ? (
               <ul className="space-y-4">
                {coverLetters.map((letter: any, index: number) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" />
                      <div>
                        <p className="font-semibold">{letter.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Created: {format(new Date(letter.createdAt), 'PPP')}
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={letter.url} target="_blank" rel="noopener noreferrer">
                        View <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">You haven't saved any cover letters yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
