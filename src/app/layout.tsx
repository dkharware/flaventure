
import type {Metadata} from 'next';
import { Readex_Pro } from 'next/font/google';
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
import { CookieConsent } from '@/components/CookieConsent';

const readexPro = Readex_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-readex-pro',
  weight: ['400', '500', '600', '700'],
});

const siteUrl = 'https://easyfreecv.com';
const faviconUrl = "https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/favicon.ico?v=2";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EasyFreeCV – Free CV Templates, Resume Tips & Shopify Expert Blogs',
    template: '%s | easyfreecv',
  },
  description: 'EasyFreeCV provides free CV templates, resume writing tips, and expert Shopify blogs covering development, headless Shopify, apps, and eCommerce insights.',
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
    title: 'EasyFreeCV – Free CV Templates, Resume Tips & Shopify Expert Blogs',
    description: 'EasyFreeCV provides free CV templates, resume writing tips, and expert Shopify blogs covering development, headless Shopify, apps, and eCommerce insights.',
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
    title: 'EasyFreeCV – Free CV Templates, Resume Tips & Shopify Expert Blogs',
    description: 'EasyFreeCV provides free CV templates, resume writing tips, and expert Shopify blogs covering development, headless Shopify, apps, and eCommerce insights.',
    images: ['/og-image.png'], // Assuming you'll add an og-image.png to your public folder
  },
  icons: {
    icon: faviconUrl,
    shortcut: faviconUrl,
    apple: faviconUrl,
  },
  manifest: `${siteUrl}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "easyfreecv",
    "url": siteUrl,
    "description": metadata.description,
    "publisher": {
      "@type": "Organization",
      "name": "easyfreecv",
      "logo": {
        "@type": "ImageObject",
        "url": "https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/easyfreecv.webp"
      }
    }
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${readexPro.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5982137810610586" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5982137810610586" crossOrigin="anonymous"></script>
        <script async src="https://fundingchoicesmessages.google.com/i/pub-5982137810610586?ers=1" nonce="pS_Qv_zWbJ90P3-2g156-A"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
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
              <CookieConsent />
            </ChatProvider>
          </LoaderProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
