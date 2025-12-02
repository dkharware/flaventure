
'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import React, { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

const GraphiQLMock = React.lazy(() => import("./GraphiQLMock").then(module => ({ default: module.GraphiQLMock })));


const apiGuideData = {
    storefrontApi: [
        {
            title: 'What is the Storefront API?',
            description: "The Storefront API gives you public, unauthenticated access to a shop’s data, allowing you to build custom storefronts on any platform (web, mobile, etc.). It provides read-only access to products, collections, and blogs, and supports checkout operations.",
            code: `// Use this API for building custom 'headless' experiences for customers.`
        },
        {
            title: 'Key Characteristics',
            description: "Public Access, Read-focused (for shop data), GraphQL Only, Optimized for Buyers.",
            code: `query GetProducts {
  products(first: 5) {
    edges {
      node {
        id
        title
      }
    }
  }
}`
        },
        {
            title: 'Common Use Cases',
            description: "Building custom websites (Next.js, etc.), creating native mobile apps, integrating 'buy' buttons into other sites.",
            code: `// Example: Fetching products for a custom React component.`
        }
    ],
    adminApi: [
        {
            title: 'What is the Admin API?',
            description: "The Admin API is your tool for building apps and integrations that manage a store's backend. It provides authenticated access to almost every piece of data in a Shopify store, from products and inventory to orders and customers.",
            code: `// Use this API for server-side logic and building apps for merchants.`
        },
        {
            title: 'Key Characteristics',
            description: "Authenticated Access (server-side only), Read & Write capabilities, available in GraphQL and REST, Optimized for Merchants.",
            code: `POST /admin/api/2024-04/products.json
{
  "product": {
    "title": "New Product Title"
  }
}`
        },
        {
            title: 'Common Use Cases',
            description: "Building custom dashboard apps, syncing inventory with an external system, automating order fulfillment.",
            code: `// Example: A script to automatically tag new orders.`
        }
    ],
    comparison: [
        {
            title: 'Storefront vs. Admin: Primary Use',
            description: "Storefront API is for building customer-facing shopping experiences. Admin API is for building backend apps for merchants to manage their store.",
            code: `// Customer sees Storefront API results.
// Merchant uses Admin API tools.`
        },
        {
            title: 'Storefront vs. Admin: Authentication',
            description: "Storefront API uses a public access token safe for client-side use. Admin API uses a private token and must only be used on a secure server.",
            code: `// Storefront Token: 'public_token_123' (safe to expose)
// Admin Token: 'shpat_private_secret_456' (NEVER expose)`
        },
        {
            title: 'Storefront vs. Admin: API Format',
            description: "Storefront API is GraphQL only. Admin API supports both GraphQL and REST.",
            code: `// Storefront: Only GraphQL queries.
// Admin: GraphQL queries/mutations OR REST requests.`
        }
    ],
    tools: [
        {
            title: 'Shopify GraphiQL App',
            description: "Explore the Shopify Admin and Storefront APIs interactively using the official GraphiQL app. It's the best way to test queries, discover available data, and get familiar with the latest API versions directly in your store.",
            code: ``,
            isLink: true,
            link: "https://shopify-graphiql-app.shopifycloud.com/login"
        }
    ]
};

const GuideCard = ({ title, description, code, isLink, link }: { title: string, description: string, code: string, isLink?: boolean, link?: string }) => {
    return (
        <Card className="flex flex-col">
            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={title} className="border-none">
                        <AccordionTrigger className="p-4 font-semibold text-left hover:no-underline">
                           {title}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                            <p className="text-sm text-muted-foreground mb-4">{description}</p>
                            {isLink && link ? (
                                <Link href={link} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                                    Install the Shopify GraphiQL App
                                </Link>
                            ) : (
                                <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                                    <code>
                                        {code}
                                    </code>
                                </pre>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
};

export function ShopifyApiGuideContent() {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredData = React.useMemo(() => {
        if (!searchTerm) {
            return apiGuideData;
        }

        const lowercasedFilter = searchTerm.toLowerCase();
        
        const filterItems = (items: any[]) => 
            items.filter(item => 
                item.title.toLowerCase().includes(lowercasedFilter) ||
                item.description.toLowerCase().includes(lowercasedFilter)
            );

        return {
            storefrontApi: filterItems(apiGuideData.storefrontApi),
            adminApi: filterItems(apiGuideData.adminApi),
            comparison: filterItems(apiGuideData.comparison),
            tools: filterItems(apiGuideData.tools),
        };
    }, [searchTerm]);

  return (
    <>
        <div className="relative mb-12 max-w-lg mx-auto">
            <Input
                type="text"
                placeholder="Search API topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <section id="interactive-example" className="mb-12">
            <h2 className="text-2xl font-bold font-headline mb-6">Interactive Example</h2>
            <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
                <GraphiQLMock />
            </Suspense>
        </section>


        {filteredData.storefrontApi.length > 0 && (
            <section id="storefront-api" className="mb-12">
                <h2 className="text-2xl font-bold font-headline mb-6">Storefront API</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {filteredData.storefrontApi.map((item) => <GuideCard key={item.title} {...item} />)}
                </div>
            </section>
        )}

        {filteredData.adminApi.length > 0 && (
            <section id="admin-api" className="mb-12">
                <h2 className="text-2xl font-bold font-headline mb-6">Admin API</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {filteredData.adminApi.map((item) => <GuideCard key={item.title} {...item} />)}
                </div>
            </section>
        )}

        {filteredData.comparison.length > 0 && (
            <section id="comparison" className="mb-12">
                <h2 className="text-2xl font-bold font-headline mb-6">Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {filteredData.comparison.map((item) => <GuideCard key={item.title} {...item} />)}
                </div>
            </section>
        )}

        {filteredData.tools.length > 0 && (
            <section id="tools" className="mb-12">
                <h2 className="text-2xl font-bold font-headline mb-6">Tools & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {filteredData.tools.map((item: any) => <GuideCard key={item.title} {...item} />)}
                </div>
            </section>
        )}
    </>
  );
}
