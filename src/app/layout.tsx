import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoaderProvider } from '@/context/LoaderContext';
import { NavigationEvents } from '@/components/NavigationEvents';
import { Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from '@/hooks/use-auth';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'ResumeFlow - Free Resume & CV Builder',
  description: 'Create your professional resume or CV for free with our easy-to-use builder. Choose from dozens of templates, including CV letter examples, to land your dream job.',
  keywords: 'free resume, cv, cv letter, cv letter example, resume builder, free cv builder, resumeflow',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const userId = cookieStore.get('session')?.value;
  let user = null;

  if (userId) {
    try {
        user = await db.getUserById(userId);
    } catch (e) {
        console.error("Failed to fetch user:", e);
        // User might have a stale cookie, treat as not logged in
        user = null;
    }
  }
  
  const authContextValue = {
    isAuthenticated: !!user,
    user: user ? { ...user, fullName: user.full_name } : null,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider value={authContextValue}>
          <LoaderProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <Toaster />
              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
          </LoaderProvider>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
