
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
import { Code, Cuboid, Filter, LayoutTemplate, SquareBrackets } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shopify Liquid Cheatsheet: Objects, Tags & Filters',
  description: 'A comprehensive Shopify Liquid tutorial and cheatsheet covering all major global objects, control flow tags, and common filters for Shopify theme development.',
  keywords: ['Shopify Liquid', 'Liquid cheatsheet', 'Shopify theme development', 'Liquid objects', 'Liquid filters', 'Liquid tags', 'Shopify tutorial'],
};

const CheatSheetSection = ({ title, id, children }: { title: string, id: string, children: React.ReactNode }) => (
    <div id={id} className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
            {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <CheatSheetSection title="Basics" id="basics">
                        <CheatSheetCard title="Syntax">
                             <p className="text-muted-foreground mb-4">Liquid has two types of delimiters:</p>
                             <ul className="space-y-2 text-sm">
                                <li><Badge variant="secondary" className="mr-2">{`{{ ... }}`}</Badge> Double curly braces denote outputs.</li>
                                <li><Badge variant="secondary" className="mr-2">{`{% ... %}`}</Badge> Curly braces with percentages denote logic and control flow.</li>
                            </ul>
                        </CheatSheetCard>
                        <CheatSheetCard title="Truthy and Falsy">
                            <p className="text-muted-foreground mb-4">In Liquid, only `false` and `nil` are falsy. Everything else is truthy, including `0`, empty strings, and empty arrays.</p>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="truthy">
                                    <AccordionTrigger>What is truthy?</AccordionTrigger>
                                    <AccordionContent>Any value that is not `false` or `nil`. This includes `true`, numbers (including 0), strings (including empty strings), and arrays (including empty arrays).</AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="falsy">
                                    <AccordionTrigger>What is falsy?</AccordionTrigger>
                                    <AccordionContent>Only `false` and `nil` are considered falsy.</AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CheatSheetCard>
                    </CheatSheetSection>

                    <CheatSheetSection title="Objects" id="objects">
                        <CheatSheetCard title="Global Objects">
                           <p className="text-muted-foreground mb-4">These objects are available on almost every page of a Shopify theme.</p>
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
                        </CheatSheetCard>
                    </CheatSheetSection>

                     <CheatSheetSection title="Tags" id="tags">
                        <CheatSheetCard title="Control Flow">
                            <p className="text-muted-foreground mb-4">Used for conditional logic.</p>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="if"><AccordionTrigger>{% if %}</AccordionTrigger><AccordionContent><pre><code className="text-xs">{`{% if product.available %}\n  In stock!\n{% elsif product.tags contains 'pre-order' %}\n  Pre-order now!\n{% else %}\n  Sold out.\n{% endif %}`}</code></pre></AccordionContent></AccordionItem>
                                <AccordionItem value="unless"><AccordionTrigger>{% unless %}</AccordionTrigger><AccordionContent>The opposite of `if`. The code block executes if the condition is false. <pre><code className="text-xs">{`{% unless product.available %}\n  Sold Out\n{% endunless %}`}</code></pre></AccordionContent></AccordionItem>
                                <AccordionItem value="case"><AccordionTrigger>{% case %}</AccordionTrigger><AccordionContent>Creates a switch statement to compare a variable against different values. <pre><code className="text-xs">{`{% case product.type %}\n{% when 'Shirt' %}\n  This is a shirt.\n{% when 'Pants' %}\n  These are pants.\n{% else %}\n  Another type of product.\n{% endcase %}`}</code></pre></AccordionContent></AccordionItem>
                            </Accordion>
                        </CheatSheetCard>
                        <CheatSheetCard title="Iteration">
                             <p className="text-muted-foreground mb-4">Iterates over an array of items.</p>
                             <Accordion type="single" collapsible>
                                <AccordionItem value="for"><AccordionTrigger>{% for %}</AccordionTrigger><AccordionContent>Loops over items in an array. <pre><code className="text-xs">{`{% for product in collection.products %}\n  <p>{{ product.title }}</p>\n{% endfor %}`}</code></pre></AccordionContent></AccordionItem>
                                <AccordionItem value="for-else"><AccordionTrigger>{% else %} for a for loop</AccordionTrigger><AccordionContent>A for loop can take an optional `else` block that executes if the array is empty. <pre><code className="text-xs">{`{% for product in collection.products %}\n  <p>{{ product.title }}</p>\n{% else %}\n  <p>No products in this collection.</p>\n{% endfor %}`}</code></pre></AccordionContent></AccordionItem>
                                <AccordionItem value="limit-offset"><AccordionTrigger>limit & offset</AccordionTrigger><AccordionContent>Control the number of items and starting point in a loop. <pre><code className="text-xs">{`{% for product in collection.products limit: 5 offset: 10 %}`}</code></pre></AccordionContent></AccordionItem>
                             </Accordion>
                        </CheatSheetCard>
                        <CheatSheetCard title="Theme Tags">
                            <p className="text-muted-foreground mb-4">Tags specific to Shopify theme structure.</p>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="form"><AccordionTrigger>{% form %}</AccordionTrigger><AccordionContent>Renders an HTML `&lt;form&gt;` tag with the necessary Shopify attributes. Example: `{% form 'product', product %}`</AccordionContent></AccordionItem>
                                <AccordionItem value="paginate"><AccordionTrigger>{% paginate %}</AccordionTrigger><AccordionContent>Used to split content across multiple pages. Must be closed with `{% endpaginate %}`. The `{{ paginate | default_pagination }}` object renders pagination links.</AccordionContent></AccordionItem>
                                <AccordionItem value="section"><AccordionTrigger>{% section %}</AccordionTrigger><AccordionContent>Renders a theme section from the `/sections` directory. Example: `{% section 'header' %}`</AccordionContent></AccordionItem>
                                <AccordionItem value="render"><AccordionTrigger>{% render %}</AccordionTrigger><AccordionContent>Renders a snippet from the `/snippets` directory, allowing variables to be passed. Example: `{% render 'my-snippet', my_variable: 'hello' %}`</AccordionContent></AccordionItem>
                            </Accordion>
                        </CheatSheetCard>
                     </CheatSheetSection>
                    
                     <CheatSheetSection title="Filters" id="filters">
                         <CheatSheetCard title="String Filters">
                           <Accordion type="single" collapsible>
                             <AccordionItem value="upcase"><AccordionTrigger>upcase</AccordionTrigger><AccordionContent>Converts a string to uppercase.</AccordionContent></AccordionItem>
                             <AccordionItem value="downcase"><AccordionTrigger>downcase</AccordionTrigger><AccordionContent>Converts a string to lowercase.</AccordionContent></AccordionItem>
                             <AccordionItem value="capitalize"><AccordionTrigger>capitalize</AccordionTrigger><AccordionContent>Capitalizes the first word of a string.</AccordionContent></AccordionItem>
                             <AccordionItem value="truncate"><AccordionTrigger>truncate</AccordionTrigger><AccordionContent>Shortens a string to a specific length. `{{ 'Hello world' | truncate: 5, '...' }}` renders "Hello...".</AccordionContent></AccordionItem>
                             <AccordionItem value="strip_html"><AccordionTrigger>strip_html</AccordionTrigger><AccordionContent>Removes all HTML tags from a string.</AccordionContent></AccordionItem>
                             <AccordionItem value="handleize"><AccordionTrigger>handleize</AccordionTrigger><AccordionContent>Converts a string into a URL-friendly handle. "My Awesome Product" becomes "my-awesome-product".</AccordionContent></AccordionItem>
                           </Accordion>
                         </CheatSheetCard>
                         <CheatSheetCard title="Number Filters">
                            <Accordion type="single" collapsible>
                             <AccordionItem value="money"><AccordionTrigger>money</AccordionTrigger><AccordionContent>Formats a price according to the store's currency settings. The best way to display prices. e.g. `{{ product.price | money }}`</AccordionContent></AccordionItem>
                             <AccordionItem value="plus"><AccordionTrigger>plus</AccordionTrigger><AccordionContent>Adds a number. `{{ 5 | plus: 3 }}` is 8.</AccordionContent></AccordionItem>
                             <AccordionItem value="minus"><AccordionTrigger>minus</AccordionTrigger><AccordionContent>Subtracts a number. `{{ 5 | minus: 3 }}` is 2.</AccordionContent></AccordionItem>
                             <AccordionItem value="times"><AccordionTrigger>times</AccordionTrigger><AccordionContent>Multiplies by a number. `{{ 5 | times: 3 }}` is 15.</AccordionContent></AccordionItem>
                             <AccordionItem value="divided_by"><AccordionTrigger>divided_by</AccordionTrigger><AccordionContent>Divides by a number. `{{ 10 | divided_by: 2 }}` is 5.</AccordionContent></AccordionItem>
                           </Accordion>
                         </CheatSheetCard>
                         <CheatSheetCard title="Array Filters">
                            <Accordion type="single" collapsible>
                             <AccordionItem value="join"><AccordionTrigger>join</AccordionTrigger><AccordionContent>Combines array elements into a string. `{{ product.tags | join: ', ' }}`.</AccordionContent></AccordionItem>
                             <AccordionItem value="first-last"><AccordionTrigger>first / last</AccordionTrigger><AccordionContent>Returns the first or last item of an array.</AccordionContent></AccordionItem>
                             <AccordionItem value="size"><AccordionTrigger>size</AccordionTrigger><AccordionContent>Returns the number of items in an array or characters in a string.</AccordionContent></AccordionItem>
                             <AccordionItem value="sort"><AccordionTrigger>sort</AccordionTrigger><AccordionContent>Sorts an array by a property of its items. `{% assign sorted_products = collection.products | sort: 'price' %}`</AccordionContent></AccordionItem>
                             <AccordionItem value="where"><AccordionTrigger>where</AccordionTrigger><AccordionContent>Filters an array to only items that have a given value for a property. `{% assign red_products = collection.products | where: 'color', 'red' %}`</AccordionContent></AccordionItem>
                           </Accordion>
                         </CheatSheetCard>
                          <CheatSheetCard title="URL Filters">
                            <Accordion type="single" collapsible>
                             <AccordionItem value="img_url"><AccordionTrigger>img_url</AccordionTrigger><AccordionContent>Returns the URL for a Shopify image. Can take a size parameter, e.g., `{{ product.featured_image | image_url: width: 500 }}`.</AccordionContent></AccordionItem>
                             <AccordionItem value="link_to_tag"><AccordionTrigger>link_to_tag</AccordionTrigger><AccordionContent>Creates an `<a>` tag that links to a collection page filtered by a tag. `{{ 'Shopify' | link_to_tag: 'Shopify' }}`.</AccordionContent></AccordionItem>
                           </Accordion>
                         </CheatSheetCard>
                     </CheatSheetSection>
                </main>
            </div>
        </div>
    </div>
  );
}
