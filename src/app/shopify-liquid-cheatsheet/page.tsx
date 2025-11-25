
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Code, Cuboid, Filter, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shopify Liquid Cheatsheet: Objects, Tags & Filters',
  description: 'A comprehensive Shopify Liquid tutorial and cheatsheet covering all major global objects, control flow tags, and common filters for Shopify theme development.',
  keywords: ['Shopify Liquid', 'Liquid cheatsheet', 'Shopify theme development', 'Liquid objects', 'Liquid filters', 'Liquid tags', 'Shopify tutorial'],
};

const CheatSheetSection = ({ title, id, children, icon }: { title: string, id: string, children: React.ReactNode, icon: React.ReactNode }) => (
    <div id={id} className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-3">
            {icon} {title}
        </h2>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const CheatSheetCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Card className="break-inside-avoid">
        <CardHeader>
            <CardTitle className="text-xl font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);


export default function ShopifyLiquidCheatsheetPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Shopify Liquid Cheatsheet' },
    ];
  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
        <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Shopify Liquid Cheatsheet</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Your quick reference guide for Shopify Liquid objects, filters, and tags.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
                <aside className="lg:col-span-3 lg:sticky top-24 self-start hidden lg:block">
                    <nav className="space-y-2">
                        <h3 className="font-semibold text-lg mb-4">Categories</h3>
                        <Link href="#basics" className="flex items-center gap-2 p-2 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                           <LayoutTemplate className="h-5 w-5" /> Basics
                        </Link>
                         <Link href="#objects" className="flex items-center gap-2 p-2 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                           <Cuboid className="h-5 w-5" /> Objects
                        </Link>
                        <Link href="#tags" className="flex items-center gap-2 p-2 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                           <Code className="h-5 w-5" /> Tags
                        </Link>
                        <Link href="#filters" className="flex items-center gap-2 p-2 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                           <Filter className="h-5 w-5" /> Filters
                        </Link>
                    </nav>
                </aside>

                <main className="lg:col-span-9">
                    <CheatSheetSection title="Basics" id="basics" icon={<LayoutTemplate />}>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="syntax">
                                <AccordionTrigger>Syntax</AccordionTrigger>
                                <AccordionContent>Liquid has two types of delimiters: Double curly braces `{{ ... }}` for outputs, and curly braces with percentages `{% ... %}` for logic.</AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="truthy">
                                <AccordionTrigger>Truthy and Falsy</AccordionTrigger>
                                <AccordionContent>In Liquid, only `false` and `nil` are falsy. Everything else is truthy, including 0, empty strings, and empty arrays.</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CheatSheetSection>

                    <CheatSheetSection title="Objects" id="objects" icon={<Cuboid />}>
                       <Accordion type="single" collapsible className="w-full">
                         <AccordionItem value="product"><AccordionTrigger>product</AccordionTrigger><AccordionContent>The product object on a product page. Contains all details like `.title`, `.price`, `.images`, etc.</AccordionContent></AccordionItem>
                         <AccordionItem value="collection"><AccordionTrigger>collection</AccordionTrigger><AccordionContent>The collection object on a collection page. Provides access to collection details and its products via `collection.products`.</AccordionContent></AccordionItem>
                         <AccordionItem value="cart"><AccordionTrigger>cart</AccordionTrigger><AccordionContent>Contains all items in the customer's cart, `.total_price`, and `.item_count`.</AccordionContent></AccordionItem>
                         <AccordionItem value="customer"><AccordionTrigger>customer</AccordionTrigger><AccordionContent>The currently logged-in customer. It's `nil` if the customer is not logged in.</AccordionContent></AccordionItem>
                         <AccordionItem value="shop"><AccordionTrigger>shop</AccordionTrigger><AccordionContent>Holds global information about the store, such as `.name`, `.currency`, and `.domain`.</AccordionContent></AccordionItem>
                         <AccordionItem value="linklists"><AccordionTrigger>linklists</AccordionTrigger><AccordionContent>Allows access to all navigation menus. Example: `linklists.main-menu.links`.</AccordionContent></AccordionItem>
                         <AccordionItem value="page"><AccordionTrigger>page</AccordionTrigger><AccordionContent>The currently viewed page (created in Online Store > Pages).</AccordionContent></AccordionItem>
                         <AccordionItem value="article"><AccordionTrigger>article</AccordionTrigger><AccordionContent>The currently viewed blog article on an article page.</AccordionContent></AccordionItem>
                       </Accordion>
                    </CheatSheetSection>

                     <CheatSheetSection title="Tags" id="tags" icon={<Code />}>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="if"><AccordionTrigger>{'{% if %}'}</AccordionTrigger><AccordionContent>Used for conditional logic with `if`, `elsif`, and `else`.</AccordionContent></AccordionItem>
                            <AccordionItem value="unless"><AccordionTrigger>{'{% unless %}'}</AccordionTrigger><AccordionContent>The opposite of `if`. The code block executes if the condition is false.</AccordionContent></AccordionItem>
                            <AccordionItem value="case"><AccordionTrigger>{'{% case %}'}</AccordionTrigger><AccordionContent>Creates a switch statement to compare a variable against different values using `when`.</AccordionContent></AccordionItem>
                            <AccordionItem value="for"><AccordionTrigger>{'{% for %}'}</AccordionTrigger><AccordionContent>Loops over items in an array.</AccordionContent></AccordionItem>
                            <AccordionItem value="form"><AccordionTrigger>{'{% form %}'}</AccordionTrigger><AccordionContent>Renders an HTML form tag with the necessary Shopify attributes.</AccordionContent></AccordionItem>
                            <AccordionItem value="paginate"><AccordionTrigger>{'{% paginate %}'}</AccordionTrigger><AccordionContent>Used to split content across multiple pages.</AccordionContent></AccordionItem>
                            <AccordionItem value="section"><AccordionTrigger>{'{% section %}'}</AccordionTrigger><AccordionContent>Renders a theme section from the /sections directory.</AccordionContent></AccordionItem>
                            <AccordionItem value="render"><AccordionTrigger>{'{% render %}'}</AccordionTrigger><AccordionContent>Renders a snippet from the /snippets directory, allowing variables to be passed.</AccordionContent></AccordionItem>
                        </Accordion>
                     </CheatSheetSection>
                    
                     <CheatSheetSection title="Filters" id="filters" icon={<Filter />}>
                         <Accordion type="single" collapsible>
                           <AccordionItem value="upcase"><AccordionTrigger>upcase</AccordionTrigger><AccordionContent>Converts a string to uppercase.</AccordionContent></AccordionItem>
                           <AccordionItem value="truncate"><AccordionTrigger>truncate</AccordionTrigger><AccordionContent>Shortens a string to a specific length.</AccordionContent></AccordionItem>
                           <AccordionItem value="strip_html"><AccordionTrigger>strip_html</AccordionTrigger><AccordionContent>Removes all HTML tags from a string.</AccordionContent></AccordionItem>
                           <AccordionItem value="handleize"><AccordionTrigger>handleize</AccordionTrigger><AccordionContent>Converts a string into a URL-friendly handle.</AccordionContent></AccordionItem>
                           <AccordionItem value="money"><AccordionTrigger>money</AccordionTrigger><AccordionContent>Formats a price according to the store's currency settings.</AccordionContent></AccordionItem>
                           <AccordionItem value="times"><AccordionTrigger>times</AccordionTrigger><AccordionContent>Multiplies by a number.</AccordionContent></AccordionItem>
                           <AccordionItem value="join"><AccordionTrigger>join</AccordionTrigger><AccordionContent>Combines array elements into a string.</AccordionContent></AccordionItem>
                           <AccordionItem value="size"><AccordionTrigger>size</AccordionTrigger><AccordionContent>Returns the number of items in an array or characters in a string.</AccordionContent></AccordionItem>
                           <AccordionItem value="where"><AccordionTrigger>where</AccordionTrigger><AccordionContent>Filters an array to only items that have a given value for a property.</AccordionContent></AccordionItem>
                           <AccordionItem value="img_url"><AccordionTrigger>img_url</AccordionTrigger><AccordionContent>Returns the URL for a Shopify image. Can take a size parameter, e.g., `_500x`.</AccordionContent></AccordionItem>
                         </Accordion>
                     </CheatSheetSection>
                </main>
            </div>
        </div>
    </div>
  );
}
