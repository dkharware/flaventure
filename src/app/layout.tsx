
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
    default: 'Free Shopify Templates, Next.js Starters & Developer Guides',
    template: '%s | storedevguide',
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
    'storedevguide',
    'Webflow',
    'WooCommerce',
    'Shopify Page Builders'
  ],
  authors: [{ name: 'storedevguide', url: siteUrl }],
  creator: 'storedevguide',
  publisher: 'storedevguide',
  openGraph: {
    title: 'Expert Shopify Blog: Themes, App Bridge, Storefront API & More',
    description: 'Your expert resource for Shopify. In-depth articles on Shopify themes, App Bridge, Storefront API, headless commerce, Webflow, WooCommerce, and more e-commerce topics.',
    url: siteUrl,
    siteName: 'storedevguide',
    images: [
      {
        url: '/og-image.png', // Assuming you'll add an og-image.png to your public folder
        width: 1200,
        height: 630,
        alt: 'storedevguide Blog',
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
    <html lang="en" suppressHydrationWarning className={`${readexPro.variable}`}>
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
          "font-body antialiased relative overflow-x-hidden"
        )}
      >
          <div className="absolute top-0 left-0 w-full h-full bg-grid-black -z-20"></div>
          <div className="absolute top-0 left-[-30%] w-[80%] h-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary))_0%,_transparent_40%)] animate-float -z-10 opacity-40"></div>
          <div className="absolute bottom-0 right-[-30%] w-[80%] h-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent))_0%,_transparent_40%)] animate-float animation-delay-[-5s] -z-10 opacity-40"></div>

          <LoaderProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                 <Suspense fallback={<TagsSkeleton />}>
                  <BlogTags />
                </Suspense>
                <main className="flex-grow pt-24">{children}</main>
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
