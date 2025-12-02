
import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Github } from 'lucide-react';
import { CopyButton } from '@/components/tools/CopyButton';

export const metadata: Metadata = {
    title: 'Free Next.js Shopify Starter Template | Headless Boilerplate',
    description: 'Download our free Next.js Shopify starter template. A production-ready boilerplate for building headless storefronts with Tailwind CSS and the Storefront API.',
    keywords: ['Next.js Shopify starter', 'Shopify boilerplate', 'headless Shopify template', 'Shopify Next.js boilerplate', 'free Shopify starter'],
};

const codeExample = `
// src/lib/shopify.ts
const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch({ query, variables }) {
  const endpoint = \`https://\${domain}/api/2024-04/graphql.json\`;
  // ... fetch logic
}

export async function getProducts() {
  const res = await shopifyFetch({
    query: \`{
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }\`
  });
  return res.data.products.edges;
}
`.trim();

const installCommand = `npx create-next-app -e https://github.com/example/nextjs-shopify-starter your-project-name`;

export default function NextjsStarterPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Templates', href: '/shopify-templates-boilerplates' },
        { label: 'Next.js Shopify Starter' },
    ];

    return (
        <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Next.js Shopify Starter Template</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl">
                    A production-ready boilerplate for building headless Shopify storefronts with Next.js, Tailwind CSS, and the Storefront API.
                </p>
                <div className="flex gap-4 mt-6">
                    <Button asChild size="lg">
                        <a href="#">
                            <Download className="mr-2 h-4 w-4" /> Download
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                         <a href="#" target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> View on GitHub
                        </a>
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <main className="lg:col-span-2 prose dark:prose-invert max-w-none">
                    <Image 
                        src="https://picsum.photos/seed/nextjs-template/1200/600"
                        alt="Screenshot of the Next.js Shopify Starter Template"
                        width={1200}
                        height={600}
                        className="rounded-lg shadow-lg mb-8"
                    />

                    <h2>What the Template Includes</h2>
                    <ul>
                        <li><strong>Next.js 14 with App Router:</strong> Get the latest features and performance benefits from Next.js.</li>
                        <li><strong>Tailwind CSS:</strong> A utility-first CSS framework for rapid UI development.</li>
                        <li><strong>Shopify Storefront API Integration:</strong> Pre-configured data fetching for products, collections, and cart.</li>
                        <li><strong>Component-Based Architecture:</strong> Built with reusable React components for easy customization.</li>
                        <li><strong>Environment Variable Setup:</strong> Easily connect to your Shopify store with a `.env.local` file.</li>
                        <li><strong>SEO Optimized:</strong> Includes support for dynamic metadata and JSON-LD schema.</li>
                    </ul>

                    <h2>Why It's Useful</h2>
                    <p>Building a headless Shopify store from scratch can be complex. You need to handle data fetching, state management, cart logic, and more. This starter template saves you hours of setup by providing a solid foundation with best practices already implemented. You can focus on building your unique brand experience instead of wrestling with boilerplate code.</p>

                    <h2>Code Example</h2>
                    <p>Fetching products from the Shopify Storefront API is already set up for you. Here’s a glimpse of how it works:</p>
                    <div className="relative">
                        <pre><code>{codeExample}</code></pre>
                        <CopyButton textToCopy={codeExample} />
                    </div>
                </main>

                <aside className="lg:col-span-1">
                    <Card className="sticky top-28">
                        <CardHeader>
                            <CardTitle>How to Install</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="font-semibold mb-2">1. Use `create-next-app`</p>
                                <p className="text-sm text-muted-foreground">The easiest way to get started is with this command:</p>
                                <div className="relative mt-2">
                                    <pre className="text-sm p-3 bg-muted rounded-md overflow-x-auto"><code>{installCommand}</code></pre>
                                    <CopyButton textToCopy={installCommand} />
                                </div>
                            </div>
                             <div>
                                <p className="font-semibold mb-2">2. Set Up Environment Variables</p>
                                <p className="text-sm text-muted-foreground">Create a `.env.local` file in your project root and add your Shopify API credentials:</p>
                                <pre className="text-sm p-3 bg-muted rounded-md mt-2">
{`NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT=...
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=...`}
                                </pre>
                            </div>
                             <div>
                                <p className="font-semibold mb-2">3. Run the Development Server</p>
                                <p className="text-sm text-muted-foreground">Start the dev server and you're ready to go!</p>
                                <pre className="text-sm p-3 bg-muted rounded-md mt-2"><code>npm run dev</code></pre>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
