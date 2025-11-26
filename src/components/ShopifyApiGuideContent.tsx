
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ShopifyApiGuideContent() {
  return (
    <div className="prose dark:prose-invert max-w-none mx-auto space-y-8">
        <section id="introduction">
            <h2>Introduction to Shopify APIs</h2>
            <p>
                Shopify provides a powerful set of APIs that allow developers to create custom solutions, from unique storefronts to complex backend management tools. Understanding the core APIs is crucial for any Shopify developer. The two main APIs you'll interact with are the **Storefront API** and the **Admin API**.
            </p>
        </section>

        <Card>
            <CardHeader>
                <CardTitle>Storefront API: Building Custom Shopping Experiences</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    The Storefront API is designed to give you public, unauthenticated access to a shop’s data. It's the primary tool for building **headless commerce** experiences, where the frontend (the "head") is decoupled from Shopify's backend. This allows you to create custom storefronts on any platform—web, mobile, or even in a video game.
                </p>
                
                <h3>Key Characteristics:</h3>
                <ul>
                    <li>**Public Access**: It's designed for client-side use and exposes data that is safe to be public, like products and collections.</li>
                    <li>**Read-focused**: Primarily used for reading shop data. It has limited write capabilities, mainly for creating a checkout and managing customer accounts.</li>
                    <li>**GraphQL Only**: The API uses GraphQL, allowing you to fetch exactly the data you need in a single, efficient query.</li>
                    <li>**Optimized for Buyers**: The API is structured around the needs of a customer browsing and buying products.</li>
                </ul>

                <h3>Common Use Cases:</h3>
                <ul>
                    <li>Building a custom website with frameworks like Next.js, Nuxt, or Gatsby.</li>
                    <li>Creating native mobile apps for iOS and Android.</li>
                    <li>Integrating "buy" buttons into other websites or applications.</li>
                    <li>Powering in-store kiosks or other unique retail experiences.</li>
                </ul>

                <h4>Example: Fetching Products with GraphQL</h4>
                <p>Here’s how you might fetch the first 5 products from your store using the Storefront API.</p>
                <pre>
                    <code>
{`
query GetProducts {
  products(first: 5) {
    edges {
      node {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
`}
                    </code>
                </pre>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Admin API: Managing the Store Backend</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    The Admin API is your tool for building apps and integrations that manage a store's backend. It provides authenticated access to almost every piece of data in a Shopify store, from products and inventory to orders and customers.
                </p>

                <h3>Key Characteristics:</h3>
                <ul>
                    <li>**Authenticated Access**: Requires an API key and password or an OAuth token. It is meant for server-to-server communication and should never be used on the client-side.</li>
                    <li>**Read & Write**: You can read, create, update, and delete almost any data in the store.</li>
                    <li>**GraphQL and REST**: The Admin API is available in both GraphQL and REST, giving you flexibility in how you interact with it.</li>
                    <li>**Optimized for Merchants**: The API is structured to help merchants manage their business operations.</li>
                </ul>

                <h3>Common Use Cases:</h3>
                <ul>
                    <li>Building custom dashboard apps for the Shopify Admin.</li>
                    <li>Syncing product inventory with an external system.</li>
                    <li>Automating order fulfillment workflows.</li>
                    <li>Creating custom reports and analytics.</li>
                </ul>

                <h4>Example: Creating a Product with REST</h4>
                <p>Here’s a cURL example of how to create a new product using the Admin API with REST.</p>
                <pre>
                    <code>
{`
curl -X POST "https://your-store-name.myshopify.com/admin/api/2024-04/products.json" \\
-H "Content-Type: application/json" \\
-H "X-Shopify-Access-Token: your-admin-api-token" \\
-d '{
  "product": {
    "title": "Burton Custom Freestyle 151",
    "body_html": "<strong>Good snowboard!</strong>",
    "vendor": "Burton",
    "product_type": "Snowboard"
  }
}'
`}
                    </code>
                </pre>
            </CardContent>
        </Card>

        <section id="comparison">
            <h2>When to Use Which API?</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left p-2">Feature</th>
                            <th className="text-left p-2">Storefront API</th>
                            <th className="text-left p-2">Admin API</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border-t">**Primary Use**</td>
                            <td className="p-2 border-t">Building custom shopping experiences (client-side)</td>
                            <td className="p-2 border-t">Managing store data and operations (server-side)</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-t">**Authentication**</td>
                            <td className="p-2 border-t">Public access token (safe for browsers)</td>
                            <td className="p-2 border-t">Private API key or OAuth (server-side only)</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-t">**Format**</td>
                            <td className="p-2 border-t">GraphQL only</td>
                            <td className="p-2 border-t">GraphQL and REST</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-t">**Typical Operations**</td>
                            <td className="p-2 border-t">Fetch products, create checkouts, manage customer accounts.</td>
                            <td className="p-2 border-t">Create/update products, manage orders, update inventory.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                In short: if you're building something for **customers to see and interact with**, use the **Storefront API**. If you're building a tool for a **merchant to manage their store**, use the **Admin API**.
            </p>
        </section>
    </div>
  );
}
