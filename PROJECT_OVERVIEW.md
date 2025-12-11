# Project Overview: Modern Blogging Platform

This document provides a high-level overview of the project structure, technologies used, and key concepts to help you navigate and understand the codebase.

## Core Technologies

- **Framework**: [Next.js 14](https://nextjs.org/) with the App Router. This means most components are React Server Components by default, which improves performance.
- **Styling**:
    - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid styling.
    - [ShadCN UI](https://ui.shadcn.com/): A collection of beautifully designed, reusable components built on top of Tailwind CSS. Base components are located in `src/components/ui`.
- **Content Management**: [Shopify](https://www.shopify.com/) as a headless CMS. Blog posts and related content are fetched from a Shopify store.
- **Language**: TypeScript.

## Project Structure

Here's a breakdown of the most important files and directories:

```
.
├── src/
│   ├── app/                # Main directory for pages and layouts (App Router)
│   │   ├── layout.tsx      # The root layout for the entire application
│   │   ├── globals.css     # Global stylesheet, including Tailwind and theme variables
│   │   ├── page.tsx        # The homepage of the application
│   │   ├── blog/
│   │   │   ├── page.tsx          # The main blog listing page (/blog)
│   │   │   └── [handle]/
│   │   │       └── page.tsx      # The dynamic page for a single blog post (/blog/my-post)
│   │   ├── tools/            # Pages for developer tools (e.g., Meta Tag Generator)
│   │   └── ...other_pages/
│   │
│   ├── components/         # Reusable React components used throughout the app
│   │   ├── ui/             # Core UI components from ShadCN (Button, Card, etc.)
│   │   ├── Header.tsx      # The main site header
│   │   ├── Footer.tsx      # The main site footer
│   │   └── BlogSidebar.tsx # The sidebar used on blog pages
│   │
│   ├── lib/                # Utility functions and core logic
│   │   ├── shopify.ts      # **VERY IMPORTANT**: All logic for fetching data from the Shopify Storefront API lives here.
│   │   ├── utils.ts        # General utility functions (e.g., `cn` for classnames).
│   │   └── placeholder-*.json # Fallback data used when Shopify credentials are not set.
│   │
│   └── context/            # React context providers
│
├── .env                    # Environment variables (for Shopify credentials)
├── next.config.js          # Next.js configuration file
└── tailwind.config.ts      # Tailwind CSS configuration file
```

## Data Flow: Headless Shopify

This application does **not** have a traditional database. Instead, it fetches all blog content from Shopify's **Storefront API**.

- **Fetching Logic**: All API calls to Shopify are centralized in `src/lib/shopify.ts`. This file contains functions like `getArticles`, `getArticleByHandle`, and `getAllTags`.
- **Placeholder Data**: If the Shopify API credentials are not provided in the `.env` file, the `shopify.ts` file is designed to gracefully fall back to using static JSON data from the `src/lib/placeholder-*.json` files. This allows the application to run and be reviewed without needing a live Shopify connection.
- **Environment Variables**: To connect your own Shopify store, you must create a `.env` file and add your store's domain and Storefront API access token. Instructions are in `README.md`.
  ```env
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="your-store-name.myshopify.com"
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN="your_storefront_api_token"
  ```

## Styling

- **Global Styles**: Core styles and CSS variables for theming (colors, radius, etc.) are defined in `src/app/globals.css`.
- **Component Styles**: Components are styled using Tailwind CSS utility classes directly in the JSX.
- **ShadCN UI**: When a new component is needed (e.g., a button, a card), it's best to use a component from `src/components/ui` or add a new one from the [ShadCN UI library](https://ui.shadcn.com/docs/components/button). This maintains a consistent design.

## Key Concepts

- **Server Components**: Most pages and components in the `app` directory are Server Components. They run on the server, can fetch data directly, and help reduce the amount of JavaScript sent to the client.
- **Client Components**: Components that require interactivity (e.g., handling clicks, using state) must be designated as Client Components with the `'use client';` directive at the top of the file. You'll find this in components like `Header.tsx` (for the mobile menu) and `LikeButton.tsx`.
- **Actions**: Form submissions and server-side mutations are handled using Next.js Server Actions, like in `src/app/actions/contact.ts`.
