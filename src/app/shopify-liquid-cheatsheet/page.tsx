
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
      <Breadcrumbs items={breadcrumbItems} className="mb-4" />
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-headline">Shopify Liquid Cheatsheet</CardTitle>
          <CardDescription className="text-lg">
            Your quick reference guide for Shopify Liquid objects, filters, and tags.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Liquid is the templating language created by Shopify that powers all Shopify themes. It acts as a bridge between the data in a merchant's store (like products and collections) and the HTML rendered in a customer's browser.
          </p>
          
          <h2 id="syntax">Syntax Basics</h2>
          <ul>
            <li><strong>Objects:</strong> <Badge variant="secondary" as="span">`{{ '...' }}`</Badge> - Used to output data. Example: `{{ product.title }}`.</li>
            <li><strong>Tags:</strong> <Badge variant="secondary" as="span">`{% '...' %}`</Badge> - Used for logic and control flow. Example: `{% if product.available %}`.</li>
          </ul>

          <h2 id="global-objects">Global Objects</h2>
          <p>These objects are available on almost every page of a Shopify theme.</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Object</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="font-semibold">product</code></TableCell>
                <TableCell>The currently viewed product on a product page. Contains all details like title, price, images, and variants.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="font-semibold">collection</code></TableCell>
                <TableCell>The currently viewed collection on a collection page. Provides access to collection details and its products.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="font-semibold">cart</code></TableCell>
                <TableCell>Contains all items in the customer's cart, the total price, and item count.</TableCell>
              </TableRow>
               <TableRow>
                <TableCell><code className="font-semibold">customer</code></TableCell>
                <TableCell>The currently logged-in customer. It's `nil` if the customer is not logged in.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="font-semibold">shop</code></TableCell>
                <TableCell>Holds global information about the store, such as name, currency, and domain.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="font-semibold">linklists</code></TableCell>
                <TableCell>Allows access to all navigation menus (link lists) configured in the Shopify admin.</TableCell>
              </TableRow>
               <TableRow>
                <TableCell><code className="font-semibold">page</code></TableCell>
                <TableCell>The currently viewed page (created in Online Store &gt; Pages).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="font-semibold">article</code></TableCell>
                <TableCell>The currently viewed blog article on an article page.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="font-semibold">blog</code></TableCell>
                <TableCell>The currently viewed blog on a blog page.</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h2 id="common-filters">Common Filters</h2>
          <p>Filters are methods that modify the output of numbers, strings, objects, and variables. They are used within an output tag `{{ }}` and are separated by a `|`.</p>
          
          <h3>String Filters</h3>
          <ul>
            <li>`upcase` / `downcase` / `capitalize`: Changes the case of a string.</li>
            <li>`truncate: 15, '...'`: Shortens a string to a specific length, appending an ellipsis.</li>
            <li>`strip_html`: Removes all HTML tags from a string.</li>
            <li>`handleize`: Converts a string into a URL-friendly handle.</li>
          </ul>
          <pre><code>{{ 'Hello World' | upcase }}
&lt;!-- Renders: HELLO WORLD --&gt;</code></pre>

          <h3>Number Filters</h3>
          <ul>
            <li>`money`: Formats a price according to the store's currency settings. The best way to display prices.</li>
            <li>`plus: 5` / `minus: 2` / `times: 3` / `divided_by: 4`: Basic math operations.</li>
          </ul>
           <pre><code>{{ product.price | money }}
&lt;!-- Renders: $19.99 (depending on currency settings) --&gt;</code></pre>

          <h3>Array Filters</h3>
          <ul>
            <li>`join: ', '`: Combines array elements into a single string, separated by the specified delimiter.</li>
            <li>`first` / `last`: Returns the first or last item of an array.</li>
            <li>`size`: Returns the number of items in an array.</li>
          </ul>
           <pre><code>{{ product.tags | join: ', ' }}
&lt;!-- Renders: tag1, tag2, tag3 --&gt;</code></pre>

          <h2 id="control-flow-tags">Control Flow Tags</h2>
          <p>Tags add logic and control to your templates.</p>
          
          <h3>If / Else / Unless</h3>
          <p>Used for conditional logic.</p>
          <pre><code>{% if product.available %}
  &lt;p&gt;In stock!&lt;/p&gt;
{% else %}
  &lt;p&gt;Sold out.&lt;/p&gt;
{% endif %}

{% unless product.tags contains 'new' %}
  &lt;p&gt;This is not a new product.&lt;/p&gt;
{% endunless %}</code></pre>

          <h3>For Loop</h3>
          <p>Iterates over an array of items, like products in a collection or line items in a cart.</p>
          <pre><code>{% for product in collection.products %}
  &lt;h3&gt;{{ product.title }}&lt;/h3&gt;
{% endfor %}</code></pre>
          <p>You can also use `else` with a for loop, and control the loop with `limit` and `offset`.</p>
          <pre><code>{% for product in collection.products limit: 5 %}
  &lt;p&gt;{{ product.title }}&lt;/p&gt;
{% else %}
  &lt;p&gt;This collection has no products.&lt;/p&gt;
{% endfor %}</code></pre>

          <h3>Case Statement</h3>
          <p>Creates a switch statement to compare a variable against different values.</p>
          <pre><code>{% case product.type %}
  {% when 'Shirt' %}
    &lt;p&gt;This is a shirt.&lt;/p&gt;
  {% when 'Pants' %}
    &lt;p&gt;These are pants.&lt;/p&gt;
  {% else %}
    &lt;p&gt;This is another type of product.&lt;/p&gt;
{% endcase %}</code></pre>

          <h2 id="theme-tags">Theme Tags</h2>
           <p>Tags specific to Shopify theme structure.</p>
           
           <h3>form</h3>
           <p>Renders an HTML `<form>` element with the necessary inputs for adding products to the cart, signing up for a newsletter, etc.</p>
           <pre><code>{% form 'product', product %}
  &lt;!-- Add to cart button and variant selectors go here --&gt;
  &lt;button type="submit"&gt;Add to Cart&lt;/button&gt;
{% endform %}</code></pre>

           <h3>paginate</h3>
           <p>Used to split content across multiple pages, like products in a collection or articles in a blog.</p>
           <pre><code>{% paginate collection.products by 12 %}
  {% for product in collection.products %}
    &lt;!-- Product card HTML --&gt;
  {% endfor %}
  
  {{ paginate | default_pagination }}
{% endpaginate %}</code></pre>

           <h3>section</h3>
           <p>Renders a theme section from the `/sections` directory. This is the foundation of modern Shopify themes.</p>
           <pre><code>{% section 'header' %}</code></pre>
        </CardContent>
      </Card>
    </div>
  );
}
