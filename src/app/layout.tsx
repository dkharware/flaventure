
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
import { GoogleAd } from '@/components/GoogleAd';

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
    default: 'Expert Shopify & Resume Blog | Tips, Guides, & News | easyfreecv',
    template: '%s | easyfreecv',
  },
  description: 'Your go-to source for expert articles on Shopify development, headless commerce, and career advice. Get the latest insights on resume building, theme development, and the Storefront API.',
  keywords: [
    'Shopify blog', 
    'resume advice',
    'career development',
    'Shopify development',
    'headless commerce',
    'Storefront API',
    'Next.js blog',
    'easyfreecv'
  ],
  authors: [{ name: 'easyfreecv', url: siteUrl }],
  creator: 'easyfreecv',
  publisher: 'easyfreecv',
  openGraph: {
    title: 'Expert Shopify & Resume Blog | easyfreecv',
    description: 'Your go-to source for expert articles on Shopify development, headless commerce, and career advice.',
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
    title: 'Expert Shopify & Resume Blog | easyfreecv',
    description: 'Your go-to source for expert articles on Shopify development, headless commerce, and career advice.',
    images: ['/og-image.png'], // Assuming you'll add an og-image.png to your public folder
  },
  icons: {
    icon: 'https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/easyfreecv.webp',
    shortcut: 'https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/easyfreecv.webp',
    apple: 'https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/easyfreecv.webp',
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
                <GoogleAd />
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
