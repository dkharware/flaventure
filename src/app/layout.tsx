
import type {Metadata} from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoaderProvider } from '@/context/LoaderContext';
import { NavigationEvents } from '@/components/NavigationEvents';
import { Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { ChatWidget } from '@/components/ChatWidget';
import { MobileNav } from '@/components/MobileNav';
import { ChatProvider } from '@/context/ChatContext';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

const siteUrl = 'https://easyfreecv.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'easyfreecv: A Modern Blog',
    template: '%s | easyfreecv',
  },
  description: 'A modern, stylish blog powered by Shopify and Next.js.',
  keywords: [
    'blog', 
    'tech blog',
    'shopify blog',
    'next.js blog',
    'easyfreecv'
  ],
  authors: [{ name: 'easyfreecv', url: siteUrl }],
  creator: 'easyfreecv',
  publisher: 'easyfreecv',
  openGraph: {
    title: 'easyfreecv: A Modern Blog',
    description: 'A modern, stylish blog powered by Shopify and Next.js.',
    url: siteUrl,
    siteName: 'easyfreecv',
    images: [
      {
        url: '/og-image.png', // Assuming you'll add an og-image.png to your public folder
        width: 1200,
        height: 630,
        alt: 'easyfreecv Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'easyfreecv: A Modern Blog',
    description: 'A modern, stylish blog powered by Shopify and Next.js.',
    images: ['/og-image.png'], // Assuming you'll add an og-image.png to your public folder
  },
  icons: {
    icon: 'https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/favicon.ico',
    shortcut: 'https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/favicon.ico',
    apple: 'https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/favicon.ico',
  },
  manifest: `${siteUrl}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <body className="font-body antialiased">
          <LoaderProvider>
            <ChatProvider>
              <div className="flex flex-col min-h-screen pb-16 md:pb-0">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <Toaster />
              <MobileNav />
              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
              <ChatWidget />
            </ChatProvider>
          </LoaderProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
