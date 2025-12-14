
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoaderProvider } from '@/context/LoaderContext';
import { NavigationEvents } from '@/components/NavigationEvents';
import { Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { CookieConsent } from '@/components/CookieConsent';
import Script from 'next/script';
import { BlogTags } from '@/components/BlogTags';
import { Skeleton } from '@/components/ui/skeleton';
import { getSiteUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

const siteUrl = getSiteUrl();
const faviconUrl = "https://5lgivccarqkvddiv.public.blob.vercel-storage.com/favicon.ico";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shopify Headless, Hydrogen & AI Developer Guides | storedevguide',
    template: '%s | storedevguide',
  },
  description: 'Your expert resource for Shopify. In-depth articles on AI in e-commerce, Shopify themes, Hydrogen, headless commerce with Next.js, and free developer tools.',
  keywords: [
    'Shopify', 
    'Shopify AI',
    'Hydrogen',
    'Headless Shopify',
    'AI for e-commerce',
    'Shopify theme',
    'Shopify app bridge',
    'Shopify storefront',
    'Shopify development',
    'Storefront API',
    'Shopify blog',
    'storedevguide',
    'Next.js Shopify',
    'Shopify tools'
  ],
  authors: [{ name: 'storedevguide', url: siteUrl }],
  creator: 'storedevguide',
  publisher: 'storedevguide',
  openGraph: {
    title: 'Shopify Headless, Hydrogen & AI Developer Guides | storedevguide',
    description: 'Your expert resource for Shopify. In-depth articles on AI in e-commerce, Shopify themes, Hydrogen, headless commerce with Next.js, and free developer tools.',
    url: siteUrl,
    siteName: 'storedevguide',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'storedevguide - Shopify AI, Hydrogen, and Headless Developer Guides',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Headless, Hydrogen & AI Developer Guides | storedevguide',
    description: 'Your expert resource for Shopify. In-depth articles on AI in e-commerce, Shopify themes, Hydrogen, headless commerce with Next.js, and free developer tools.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: faviconUrl,
    shortcut: faviconUrl,
    apple: faviconUrl,
  },
};

const TagsSkeleton = () => (
    <div className="w-full py-4 border-b">
        <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-7xl flex gap-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-24" />
            </div>
        </div>
    </div>
)


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "storedevguide",
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
      "name": "storedevguide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://5lgivccarqkvddiv.public.blob.vercel-storage.com/newlogo.webp",
        "width": 150,
        "height": 40
      }
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="p:domain_verify" content="9e86368e858272577ac859ef29ea3e3b"/>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-0H420BHZNW"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-0H420BHZNW');
            `}
        </Script>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={cn(
          "font-body antialiased"
        )}
      >
          <LoaderProvider>
              <div className="flex flex-col min-h-screen relative overflow-x-hidden">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <Toaster />
              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
              <CookieConsent />
          </LoaderProvider>
        <SpeedInsights />
        <Analytics />
        <Script 
          src="https://quge5.com/88/tag.min.js" 
          data-zone="192397" 
          data-cfasync="false"
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
