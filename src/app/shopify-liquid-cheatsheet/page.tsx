
'use client';

import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const liquidCheatsheetData = {
    basics: [
        {
            title: 'Output Syntax',
            description: "Use double curly braces `{{ ... }}` to output dynamic content. The content inside is evaluated and displayed.",
            code: `<h1>{{ product.title }}</h1>`
        },
        {
            title: 'Tag Syntax',
            description: "Use curly braces with percentages `{% ... %}` for logic and control flow, like loops or conditionals.",
            code: `{% for product in collection.products %}\n  <p>{{ product.title }}</p>\n{% endfor %}`
        },
        {
            title: 'Truthy and Falsy',
            description: "In Liquid, only `false` and `nil` are considered 'falsy'. Everything else, including `0` and empty strings, is 'truthy'.",
            code: `{% assign empty_string = "" %}\n{% if empty_string %}\n  This will be rendered.\n{% endif %}`
        }
    ],
    objects: [
        {
            title: 'product',
            description: 'Refers to the product on a product page. Common properties: .title, .handle, .price, .compare_at_price, .variants, .images, .featured_image, .description, .collections, .tags, .available',
            code: `<p>Price: {{ product.price | money }}</p>`
        },
        {
            title: 'collection',
            description: 'Refers to the collection on a collection page. Provides access to collection details and its products. Common properties: .title, .handle, .description, .image, .products, .all_tags, .products_count',
            code: `<h2>{{ collection.title }}</h2>\n\n<ul>\n{% for product in collection.products %}\n  <li>{{ product.title }}</li>\n{% endfor %}\n</ul>`
        },
        {
            title: 'cart',
            description: "Contains information about the customer's shopping cart. Common properties: .item_count, .total_price, .items, .note, .attributes, .original_total_price",
            code: `<p>You have {{ cart.item_count }} items in your cart.</p>`
        },
        {
            title: 'customer',
            description: 'Refers to the currently logged-in customer. It is `nil` if the user is not logged in. Common properties: .first_name, .last_name, .email, .orders, .last_order, .default_address, .addresses, .tags',
            code: `{% if customer %}\n  <p>Welcome, {{ customer.first_name }}!</p>\n{% else %}\n  <a href="/account/login">Login</a>\n{% endif %}`
        },
        {
            title: 'shop',
            description: 'Holds global information about the store. Common properties: .name, .currency, .domain, .url, .money_format, .permanent_domain, .email',
            code: `<p>&copy; {{ "now" | date: "%Y" }} {{ shop.name }}</p>`
        },
        {
            title: 'linklists',
            description: 'Allows access to all navigation menus (link lists) created in the admin. Use handles to access specific menus. A link has: .title, .url, .active, .links (for nested menus)',
            code: `{% for link in linklists.main-menu.links %}\n  <a href="{{ link.url }}">{{ link.title }}</a>\n{% endfor %}`
        },
        {
            title: 'page',
            description: 'Refers to the content of a standard page created in the Shopify admin. Common properties: .title, .content, .author, .published_at',
            code: `<h1>{{ page.title }}</h1>\n<div>{{ page.content }}</div>`
        },
        {
            title: 'article',
            description: 'Refers to a blog article on an article page. Common properties: .title, .content, .excerpt, .image, .authorV2, .published_at, .tags',
            code: `<h1>{{ article.title }}</h1>\n<p>By {{ article.authorV2.name }}</p>`
        },
        {
            title: 'order',
            description: "Refers to an order. Typically used on the Order Status page of the checkout. Common properties: .name, .total_price, .customer, .shipping_address, .line_items, .created_at",
            code: `<p>Order Number: {{ order.name }}</p>\n<p>Total: {{ order.total_price | money }}</p>`
        },
        {
            title: 'blog',
            description: 'Refers to a blog on a blog page. Common properties: .title, .handle, .articles, .articles_count, .tags',
            code: `<h1>{{ blog.title }}</h1>`
        },
        {
            title: 'current_page',
            description: 'Refers to the current page number when using pagination.',
            code: `<p>You are on page {{ current_page }}</p>`
        },
        {
            title: 'current_tags',
            description: 'An array of tags currently being used to filter a collection or blog.',
            code: `Current tags: {{ current_tags | join: ', ' }}`
        },
    ],
    tags: [
        { title: '{% if %}', description: 'Used for conditional logic with `elsif` and `else`.', code: `{% if product.available %}\n  <p>In stock!</p>\n{% else %}\n  <p>Sold out.</p>\n{% endif %}`},
        { title: '{% unless %}', description: 'The opposite of `if`. Executes code if the condition is false.', code: `{% unless product.available %}\n  <p>This product is currently unavailable.</p>\n{% endunless %}`},
        { title: '{% case %}', description: 'Creates a switch statement to compare a variable against different values.', code: `{% case product.type %}\n  {% when "Shirt" %}\n    <p>This is a shirt.</p>\n  {% when "Pants" %}\n    <p>These are pants.</p>\n  {% else %}\n    <p>Other product type.</p>\n{% endcase %}`},
        { title: '{% for %}', description: 'Loops over items in an array. Can be used with `limit` and `offset`.', code: `{% for tag in product.tags %}\n  <span>{{ tag }}</span>\n{% endfor %}`},
        { title: '{% form %}', description: 'Renders an HTML `<form>` tag with the necessary Shopify attributes.', code: `{% form 'product', product %}\n  ...\n{% endform %}`},
        { title: '{% paginate %}', description: 'Splits content (like products or articles) across multiple pages.', code: `{% paginate collection.products by 12 %}\n  ...\n{% endpaginate %}`},
        { title: '{% section %}', description: 'Renders a theme section from the `/sections` directory.', code: `{% section 'header' %}`},
        { title: '{% render %}', description: 'Renders a snippet from the `/snippets` directory and allows variables to be passed.', code: `{% render 'product-card', product: my_product %}`},
        { title: '{% cycle %}', description: 'Cycles through a group of strings or variables each time it is called.', code: `{% for item in items %}\n <div class="{% cycle 'odd', 'even' %}">\n   {{ item.name }}\n </div>\n{% endfor %}` },
        { title: '{% tablerow %}', description: 'Generates `<tr>` and `<td>` tags for a table, wrapping items from a for loop.', code: `<table>\n{% tablerow product in collection.products cols: 3 %}\n  {{ product.title }}\n{% endtablerow %}\n</table>` }
    ],
    filters: [
        { title: 'upcase', description: 'Converts a string to uppercase.', code: `{{ 'hello' | upcase }} -> HELLO`},
        { title: 'truncate', description: 'Shortens a string to a specific length, appending "...".', code: `{{ 'Hello world' | truncate: 8 }} -> Hello...`},
        { title: 'strip_html', description: 'Removes all HTML tags from a string.', code: `{{ '<h1>Title</h1>' | strip_html }} -> Title`},
        { title: 'handleize', description: 'Converts a string into a URL-friendly handle.', code: `{{ "My Awesome Page" | handleize }} -> my-awesome-page`},
        { title: 'money', description: "Formats a price according to the store's currency settings.", code: `{{ 1999 | money }} -> $19.99`},
        { title: 'times', description: 'Multiplies a number.', code: `{{ 5 | times: 3 }} -> 15`},
        { title: 'join', description: 'Combines array elements into a single string, separated by a specified delimiter.', code: `{% assign tags = "one, two, three" | split: ", " %}\n{{ tags | join: ' & ' }} -> one & two & three`},
        { title: 'size', description: 'Returns the number of items in an array or characters in a string.', code: `{{ product.tags | size }} -> 3`},
        { title: 'where', description: 'Filters an array to only include items that have a given value for a property.', code: `{% assign available_products = collection.products | where: "available", true %}`},
        { title: 'img_url', description: 'Returns the URL for a Shopify image, with an optional size parameter.', code: `{{ product.featured_image | img_url: '400x' }}`},
        { title: 'date', description: 'Formats a timestamp string using strftime-like format strings.', code: `{{ article.published_at | date: "%Y-%m-%d" }}`},
        { title: 'default', description: 'Returns a default value if the input is nil, false, or empty.', code: `{{ product.metafields.custom.title | default: "Default Title" }}`},
        { title: 'append', description: 'Adds a string to the end of another string.', code: `{{ 'style' | append: '.css' }} -> style.css` },
        { title: 'capitalize', description: 'Makes the first character of a string uppercase.', code: `{{ 'my title' | capitalize }} -> My title` },
        { title: 'first', description: 'Returns the first item of an array.', code: `{{ product.tags | first }} -> "new"` },
        { title: 'last', description: 'Returns the last item of an array.', code: `{{ product.tags | last }} -> "sale"` },
        { title: 'asset_url', description: 'Returns the URL of a file in the "assets" folder of a theme.', code: `{{ 'styles.css' | asset_url }} -> //cdn.shopify.com/.../styles.css?v=123` },
        { title: 'default_pagination', description: 'Generates pagination links.', code: `{{ paginate | default_pagination }}` }
    ],
};

const CheatSheetCard = ({ title, description, code }: { title: string, description: string, code: string }) => {
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
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                                <code>
                                    {code}
                                </code>
                            </pre>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
};

export default function ShopifyLiquidCheatsheetPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Shopify Liquid Cheatsheet' },
    ];

    const filteredData = React.useMemo(() => {
        if (!searchTerm) {
            return liquidCheatsheetData;
        }

        const lowercasedFilter = searchTerm.toLowerCase();
        
        const filterItems = (items: any[]) => 
            items.filter(item => 
                item.title.toLowerCase().includes(lowercasedFilter) ||
                item.description.toLowerCase().includes(lowercasedFilter)
            );

        return {
            basics: filterItems(liquidCheatsheetData.basics),
            objects: filterItems(liquidCheatsheetData.objects),
            tags: filterItems(liquidCheatsheetData.tags),
            filters: filterItems(liquidCheatsheetData.filters),
        };
    }, [searchTerm]);

  return (
    <>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-7xl mx-auto">
              <Breadcrumbs items={breadcrumbItems} className="mb-8" />
              <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-headline font-bold">Shopify Liquid Cheatsheet</h1>
                  <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                      Your quick reference guide for Shopify Liquid. Click on any item to see a description and code example.
                  </p>
              </div>

              <div className="relative mb-12 max-w-lg mx-auto">
                <Input 
                    type="text"
                    placeholder="Search cheatsheet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>

              {filteredData.basics.length > 0 && (
                <section id="basics" className="mb-12">
                    <h2 className="text-2xl font-bold font-headline mb-6">Basics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        {filteredData.basics.map((item) => <CheatSheetCard key={item.title} {...item} />)}
                    </div>
                </section>
              )}

              {filteredData.objects.length > 0 && (
                <section id="objects" className="mb-12">
                    <h2 className="text-2xl font-bold font-headline mb-6">Objects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        {filteredData.objects.map((item) => <CheatSheetCard key={item.title} {...item} />)}
                    </div>
                </section>
              )}

              {filteredData.tags.length > 0 && (
                <section id="tags" className="mb-12">
                    <h2 className="text-2xl font-bold font-headline mb-6">Tags</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        {filteredData.tags.map((item) => <CheatSheetCard key={item.title} {...item} />)}
                    </div>
                </section>
              )}

              {filteredData.filters.length > 0 && (
                <section id="filters" className="mb-12">
                    <h2 className="text-2xl font-bold font-headline mb-6">Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        {filteredData.filters.map((item) => <CheatSheetCard key={item.title} {...item} />)}
                    </div>
                </section>
              )}
          </div>
      </div>
    </>
  );
}
