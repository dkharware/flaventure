# easyfreecv - A Modern Blogging Platform

This is a Next.js application that serves as a modern, stylish blogging platform. It uses Shopify as a headless CMS to manage and deliver blog content.

## Getting Started

To get started, take a look at `src/app/page.tsx`. The main blog logic is in `src/app/blog` and the data fetching from Shopify is handled in `src/lib/shopify.ts`.

## Shopify Setup

You will need a Shopify store with the Headless channel installed. 

1.  **Create a private app** in your Shopify admin settings to get API credentials.
2.  **Enable Storefront API access** and grant permissions for reading articles and blogs.
3.  **Set up your environment variables** in a `.env.local` file with your Shopify Storefront API endpoint and access token.

```
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT=...
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
```

The blog is set to pull from a blog with the handle "news" by default. You can change this in `src/lib/shopify.ts`.
