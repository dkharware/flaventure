import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoaderProvider } from '@/context/LoaderContext';
import { NavigationEvents } from '@/components/NavigationEvents';
import { Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'EasyFreeCV - Free Resume & CV Builder',
  description: 'Create your professional resume or CV for free with our easy-to-use builder. Choose from dozens of templates, including CV letter examples, to land your dream job.',
  keywords: 'free resume, cv, cv letter, cv letter example, resume builder, free cv builder',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
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
        <SpeedInsights />
      </body>
    </html>
  );
}
