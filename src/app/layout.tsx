
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
import { CookieConsent } from '@/components/CookieConsent';
import Script from 'next/script';
import { BlogTags } from '@/components/BlogTags';
import { Skeleton } from '@/components/ui/skeleton';
import { getSiteUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

const readexPro = Readex_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-readex-pro',
  weight: ['400', '500', '600', '700'],
});

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={cn(
          readexPro.className,
          "font-body antialiased"
        )}
      >
          <LoaderProvider>
              <div className="flex flex-col min-h-screen relative overflow-x-hidden">
                <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
                  <div className="absolute w-[40vmax] h-[40vmax] -top-[10vmax] -left-[10vmax] animate-moveInCircle">
                    <div className="w-full h-full rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--primary)/0.4),transparent)] blob" />
                  </div>
                  <div className="absolute w-[30vmax] h-[30vmax] -bottom-[5vmax] -right-[5vmax] animate-moveInCircle" style={{ animationDelay: '5s' }}>
                    <div className="w-full h-full rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--accent)/0.3),transparent)] blob" />
                  </div>
                   <div className="absolute w-[35vmax] h-[35vmax] -bottom-[15vmax] -left-[10vmax] animate-moveInCircle" style={{ animationDelay: '10s' }}>
                    <div className="w-full h-full rounded-full bg-[radial-gradient(circle_farthest-side,hsl(220_70%_50%/0.3),transparent)] blob" />
                  </div>
                </div>
                <Header />
                 <div className="pt-24 border-b bg-background/50 backdrop-blur-lg">
                  <Suspense fallback={<TagsSkeleton />}>
                    <BlogTags />
                  </Suspense>
                 </div>
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
      </body>
    </html>
  );
}
