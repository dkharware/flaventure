
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
const faviconUrl = "https://5lgivccarqkvddiv.public.blob.vercel-storage.com/favicon.ico";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Expert Shopify Blog: Themes, App Bridge, Storefront API & More',
    template: '%s | shopifydevguide',
  },
  description: 'Your expert resource for Shopify. In-depth articles on Shopify themes, App Bridge, Storefront API, headless commerce, Webflow, WooCommerce, and more e-commerce topics.',
  keywords: [
    'Shopify', 
    'Shopify theme',
    'Shopify app bridge',
    'Shopify storefront',
    'Shopify development',
    'headless Shopify',
    'Storefront API',
    'Shopify blog',
    'shopifydevguide',
    'Webflow',
    'WooCommerce',
    'Shopify Page Builders'
  ],
  authors: [{ name: 'shopifydevguide', url: siteUrl }],
  creator: 'shopifydevguide',
  publisher: 'shopifydevguide',
  openGraph: {
    title: 'Expert Shopify Blog: Themes, App Bridge, Storefront API & More',
    description: 'Your expert resource for Shopify. In-depth articles on Shopify themes, App Bridge, Storefront API, headless commerce, Webflow, WooCommerce, and more e-commerce topics.',
    url: siteUrl,
    siteName: 'shopifydevguide',
    images: [
      {
        url: '/og-image.png', // Assuming you'll add an og-image.png to your public folder
        width: 1200,
        height: 630,
        alt: 'shopifydevguide Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Shopify Blog: Themes, App Bridge, Storefront API & More',
    description: 'Your expert resource for Shopify. In-depth articles on Shopify themes, App Bridge, Storefront API, headless commerce, Webflow, WooCommerce, and more e-commerce topics.',
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
    "name": "shopifydevguide",
    "url": siteUrl,
    "description": metadata.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/blog?query={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "shopifydevguide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://5lgivccarqkvddiv.public.blob.vercel-storage.com/storedevguide.webp",
        "width": 150,
        "height": 40
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
        <link rel="manifest" href="/site.webmanifest" />
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
