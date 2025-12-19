
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/sonner"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoaderProvider } from '@/context/LoaderContext';
import { NavigationEvents } from '@/components/NavigationEvents';
import { Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { CookieConsent } from '@/components/CookieConsent';
import Script from 'next/script';
import { getSiteUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Figtree } from 'next/font/google';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});


const siteUrl = getSiteUrl();
const faviconUrl = "https://cdn.shopify.com/s/files/1/0944/6896/4636/files/favicon.ico";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Flaventure - Travel and Food Adventure Blog',
    template: '%s | Flaventure',
  },
  description: 'Explore the world with Flaventure. In-depth travel guides, delicious food stories, and adventure inspiration for the curious traveler.',
  keywords: [
    'Travel blog', 
    'Food blog',
    'Adventure travel',
    'Culinary travel',
    'Travel guides',
    'Food stories',
    'Backpacking',
    'Solo travel',
    'Flaventure'
  ],
  authors: [{ name: 'Flaventure', url: siteUrl }],
  creator: 'Flaventure',
  publisher: 'Flaventure',
  openGraph: {
    title: 'Flaventure - Travel and Food Adventure Blog',
    description: 'Explore the world with Flaventure. In-depth travel guides, delicious food stories, and adventure inspiration for the curious traveler.',
    url: siteUrl,
    siteName: 'Flaventure',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flaventure - A travel and food adventure blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flaventure - Travel and Food Adventure Blog',
    description: 'Explore the world with Flaventure. In-depth travel guides, delicious food stories, and adventure inspiration for the curious traveler.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: faviconUrl,
    shortcut: faviconUrl,
    apple: faviconUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Flaventure",
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
      "name": "Flaventure",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.shopify.com/s/files/1/0944/6896/4636/files/logo.webp",
        "width": 150,
        "height": 40
      }
    }
  };

  return (
    <html lang="en" suppressHydrationWarning className={figtree.variable}>
      <head>
        <meta name="p:domain_verify" content="9e86368e858272577ac859ef29ea3e3b"/>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-0H420BHZNW"
            strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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
              <ScrollToTopButton />
          </LoaderProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
