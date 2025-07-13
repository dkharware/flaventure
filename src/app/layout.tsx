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
  title: 'easyfreecv: Free CV and Resume Builder',
  description: 'Build a professional CV or resume for free with easyfreecv. Our free resume builder and CV maker offers professional templates to help you land your dream job. Create your CV in minutes.',
  keywords: [
    'resume builder', 
    'cv builder', 
    'free resume builder', 
    'free cv builder', 
    'easyfreecv', 
    'cv maker', 
    'resume maker', 
    'online resume builder', 
    'online cv builder',
    'professional resume templates',
    'cv templates',
    'cv letter example'
  ],
  authors: [{ name: 'easyfreecv' }],
  creator: 'easyfreecv',
  publisher: 'easyfreecv',
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
        // User might have a stale cookie or DB error, treat as not logged in
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
