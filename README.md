# storedevguide - A Modern Blogging Platform

This is a Next.js application that serves as a modern, stylish blogging platform. It uses Shopify as a headless CMS to manage and deliver blog content.

## Getting Started

To get started, take a look at `src/app/page.tsx`. The main blog logic is in `src/app/blog` and the data fetching from Shopify is handled in `src/lib/shopify.ts`.

## Shopify Setup (IMPORTANT)

To connect your Shopify store, you need to provide two pieces of information in your `.env` file: your store domain and a **Storefront API access token**.

**The application will show placeholder data until valid credentials are provided.**

### Step 1: Find Your Store Domain

This is the `myshopify.com` URL for your store (e.g., `your-store-name.myshopify.com`).

### Step 2: Create a Storefront API Access Token

1.  From your Shopify admin, go to **Settings** > **Apps and sales channels**.
2.  Click **Develop apps**, then **Create an app**. Give it a name like "Headless Blog".
3.  Once created, go to the **Configuration** tab. In the **Storefront API integration** section, click **Edit**.
4.  Check the boxes for the permissions you need. For this blog, you **MUST** enable the following permissions:
    *   `unauthenticated_read_content` (to read blogs, articles, and pages)
    *   `unauthenticated_read_product_listings` (to read products and collections, which are used for tags)
5.  Click **Save**.
6.  Now, go to the **API credentials** tab.
7.  In the **Storefront API access token** section, click **Install**.
8.  Click **Install** again in the confirmation dialog.
9.  You will now see your token. Click the icon to **copy it to your clipboard**. **This token is only shown once, so save it securely.**

### Step 3: Set Up Your Environment Variables

Create a `.env` file in the root of your project and add the credentials you just obtained:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="your-store-name.myshopify.com"
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN="paste_your_token_here"
```

The blog is set to pull from a blog with the handle "news" by default. You can change this in `src/lib/shopify.ts`.
