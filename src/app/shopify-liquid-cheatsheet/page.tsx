
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shopify Liquid Cheatsheet: Objects, Tags & Filters',
  description: 'A comprehensive Shopify Liquid tutorial and cheatsheet covering all major global objects, control flow tags, and common filters for Shopify theme development.',
  keywords: ['Shopify Liquid', 'Liquid cheatsheet', 'Shopify theme development', 'Liquid objects', 'Liquid filters', 'Liquid tags', 'Shopify tutorial'],
};

export default function ShopifyLiquidCheatsheetPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Shopify Liquid Cheatsheet' },
    ];

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Shopify Liquid Cheatsheet</h1>
                <p className="text-lg text-muted-foreground mt-2">
                    Your quick reference guide for Shopify Liquid objects, filters, and tags.
                </p>
            </div>

            <section id="basics" className="mb-12">
                <h2 className="text-2xl font-bold font-headline">Basics</h2>
                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="font-semibold">Syntax</h3>
                        <p>Liquid has two types of delimiters: Double curly braces `{{ '{{' }} ... }} ` for outputs, and curly braces with percentages `{% '{%' %} ... %}` for logic.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Truthy and Falsy</h3>
                        <p>In Liquid, only `false` and `nil` are falsy. Everything else is truthy, including 0, empty strings, and empty arrays.</p>
                    </div>
                </div>
            </section>

            <section id="objects" className="mb-12">
                <h2 className="text-2xl font-bold font-headline">Objects</h2>
                <div className="mt-4 space-y-4">
                    <div><h3 className="font-semibold">product</h3><p>The product object on a product page. Contains all details like `.title`, `.price`, `.images`, etc.</p></div>
                    <div><h3 className="font-semibold">collection</h3><p>The collection object on a collection page. Provides access to collection details and its products via `collection.products`.</p></div>
                    <div><h3 className="font-semibold">cart</h3><p>Contains all items in the customer's cart, `.total_price`, and `.item_count`.</p></div>
                    <div><h3 className="font-semibold">customer</h3><p>The currently logged-in customer. It's `nil` if the customer is not logged in.</p></div>
                    <div><h3 className="font-semibold">shop</h3><p>Holds global information about the store, such as `.name`, `.currency`, and `.domain`.</p></div>
                    <div><h3 className="font-semibold">linklists</h3><p>Allows access to all navigation menus. Example: `linklists.main-menu.links`.</p></div>
                    <div><h3 className="font-semibold">page</h3><p>The currently viewed page (created in Online Store > Pages).</p></div>
                    <div><h3 className="font-semibold">article</h3><p>The currently viewed blog article on an article page.</p></div>
                </div>
            </section>

            <section id="tags" className="mb-12">
                <h2 className="text-2xl font-bold font-headline">Tags</h2>
                <div className="mt-4 space-y-4">
                    <div><h3 className="font-semibold">{`{% if %}`}</h3><p>Used for conditional logic with `if`, `elsif`, and `else`.</p></div>
                    <div><h3 className="font-semibold">{`{% unless %}`}</h3><p>The opposite of `if`. The code block executes if the condition is false.</p></div>
                    <div><h3 className="font-semibold">{`{% case %}`}</h3><p>Creates a switch statement to compare a variable against different values using `when`.</p></div>
                    <div><h3 className="font-semibold">{`{% for %}`}</h3><p>Loops over items in an array.</p></div>
                    <div><h3 className="font-semibold">{`{% form %}`}</h3><p>Renders an HTML form tag with the necessary Shopify attributes.</p></div>
                    <div><h3 className="font-semibold">{`{% paginate %}`}</h3><p>Used to split content across multiple pages.</p></div>
                    <div><h3 className="font-semibold">{`{% section %}`}</h3><p>Renders a theme section from the /sections directory.</p></div>
                    <div><h3 className="font-semibold">{`{% render %}`}</h3><p>Renders a snippet from the /snippets directory, allowing variables to be passed.</p></div>
                </div>
            </section>

            <section id="filters" className="mb-12">
                <h2 className="text-2xl font-bold font-headline">Filters</h2>
                <div className="mt-4 space-y-4">
                    <div><h3 className="font-semibold">upcase</h3><p>Converts a string to uppercase.</p></div>
                    <div><h3 className="font-semibold">truncate</h3><p>Shortens a string to a specific length.</p></div>
                    <div><h3 className="font-semibold">strip_html</h3><p>Removes all HTML tags from a string.</p></div>
                    <div><h3 className="font-semibold">handleize</h3><p>Converts a string into a URL-friendly handle.</p></div>
                    <div><h3 className="font-semibold">money</h3><p>Formats a price according to the store's currency settings.</p></div>
                    <div><h3 className="font-semibold">times</h3><p>Multiplies by a number.</p></div>
                    <div><h3 className="font-semibold">join</h3><p>Combines array elements into a string.</p></div>
                    <div><h3 className="font-semibold">size</h3><p>Returns the number of items in an array or characters in a string.</p></div>
                    <div><h3 className="font-semibold">where</h3><p>Filters an array to only items that have a given value for a property.</p></div>
                    <div><h3 className="font-semibold">img_url</h3><p>Returns the URL for a Shopify image. Can take a size parameter, e.g., `_500x`.</p></div>
                </div>
            </section>
        </div>
    </div>
  );
}
