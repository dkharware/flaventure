
export interface Faq {
    question: string;
    answer: string;
}

export interface FaqCategory {
    category: string;
    questions: Faq[];
}

export const faqData: FaqCategory[] = [
    {
        category: "Blogging & Content",
        questions: [
            {
                question: "How can I improve my blog's SEO on Shopify?",
                answer: "Focus on using relevant keywords in your titles and descriptions, add alt text to images, and create high-quality, original content. A Shopify-focused blog should naturally rank well for terms like 'Shopify theme' or 'Shopify storefront' if the content is valuable."
            },
            {
                question: "What's the ideal length for a blog post?",
                answer: "For technical topics like Shopify development, longer posts (1,500-2,500 words) that cover a subject in-depth tend to perform best. They establish authority and provide comprehensive value to the reader."
            },
            {
                question: "How often should I post new articles?",
                answer: "Consistency is more important than frequency. Aim for a schedule you can maintain, whether it's once a week or twice a month. This helps build a loyal audience and signals to search engines that your site is actively updated."
            },
            {
                question: "Can I use AI to help write my blog posts?",
                answer: "Yes, AI tools can be great for generating ideas, creating outlines, and drafting sections. However, it's crucial to edit and add your own expertise and voice to ensure the content is accurate, unique, and truly helpful."
            },
            {
                question: "How do I add a table of contents to my Shopify blog posts?",
                answer: "You can add a table of contents by using an app from the Shopify App Store or by adding custom code to your theme. A ToC improves user experience on long posts and can help with SEO by creating jump links in search results."
            }
        ]
    },
    {
        category: "Shopify",
        questions: [
            {
                question: "What is Shopify and how can it help my business?",
                answer: "Shopify is a complete e-commerce platform that lets you start, grow, and manage a business. It allows you to create an online store, sell in multiple places (web, mobile, social media), manage products and inventory, and process payments."
            },
            {
                question: "How do I set up a blog on Shopify?",
                answer: "Shopify comes with a built-in blogging engine. You can add a new blog from your Shopify admin under 'Online Store' > 'Blog Posts'. From there, you can create and manage your posts, which is a great way to improve SEO and engage with your customers."
            },
            {
                question: "Can I use my own domain name with Shopify?",
                answer: "Yes, you can use a custom domain name with Shopify. You can purchase one through Shopify or connect an existing domain that you own. Using a custom domain builds your brand and makes it easier for customers to find you."
            },
            {
                question: "What are Shopify Themes and how do I choose one?",
                answer: "Shopify Themes are templates that determine the look and feel of your online store. The Shopify Theme Store has over 100 free and paid themes. When choosing, consider your industry, catalog size, and desired features. Always choose a mobile-responsive theme."
            },
            {
                question: "How does Shopify Payments work?",
                answer: "Shopify Payments is the simplest way to accept payments online. It's fully integrated with your store and eliminates the hassle of setting up a third-party payment provider. It supports all major credit cards."
            },
        ]
    },
    {
        category: "Theme & App",
        questions: [
            {
                question: "What is Liquid in Shopify theme development?",
                answer: "Liquid is an open-source template language created by Shopify and written in Ruby. It is the backbone of Shopify themes and is used to load dynamic content to the pages of an online store."
            },
            {
                question: "What tools do I need for Shopify theme development?",
                answer: "For local Shopify theme development, you will need the Shopify CLI. It allows you to create, test, and deploy themes from your command line. You'll also need a code editor like VS Code and a version control system like Git."
            },
            {
                question: "What are sections and blocks in a Shopify theme?",
                answer: "Sections are modular components of a theme that merchants can customize. Blocks are individual pieces of content within a section, such as an image, text, or a button, that can also be customized and reordered."
            },
            {
                question: "What is Shopify App Bridge and when should I use it?",
                answer: "Shopify App Bridge is a JavaScript library that allows your embedded app (loaded in an iframe in the Shopify admin) to communicate with the Shopify admin outside the iframe. You should use it for any app that needs to interact with native Shopify UI elements, like displaying a toast notification or opening a resource picker."
            },
            {
                question: "Can I use modern JavaScript frameworks in a Shopify theme?",
                answer: "Yes, you can integrate frameworks like React or Vue.js into a Shopify theme. This is often done for complex UI components or for building a headless storefront that uses Shopify for its backend."
            }
        ]
    },
    {
        category: "Storefront API",
        questions: [
            {
                question: "What is the Shopify Storefront API?",
                answer: "The Shopify Storefront API gives you unauthenticated access to a shop’s data, allowing you to build custom storefronts on any platform (web, mobile, etc.). It provides read-only access to products, collections, and blogs, and supports checkout operations."
            },
            {
                question: "What's the difference between the Admin API and the Storefront API?",
                answer: "The Admin API is for building apps for the Shopify admin (e.g., managing products, orders) and requires authentication. The Storefront API is for building custom, public-facing shopping experiences (a custom Shopify storefront) and is largely unauthenticated."
            },
            {
                question: "How do I get a Shopify Storefront API access token?",
                answer: "You can get an access token by creating a private app in your Shopify admin or by installing the Headless channel. You must grant the necessary permissions for the API scopes you need (e.g., `unauthenticated_read_product_listings`)."
            },
            {
                question: "Is the Shopify Storefront API based on REST or GraphQL?",
                answer: "The Storefront API is based on GraphQL. This allows you to request exactly the data you need in a single API call, making it more efficient than traditional REST APIs for building a custom Shopify storefront."
            },
            {
                question: "How do I handle checkouts with the Storefront API?",
                answer: "You can create and manage checkouts using the Storefront API. This involves creating a checkout, adding line items, and retrieving the checkout URL, which you then direct the customer to for payment completion on Shopify's secure servers."
            },
        ]
    },
    {
        category: "Headless Shopify",
        questions: [
            {
                question: "What does 'headless commerce' mean?",
                answer: "Headless commerce is an architecture where the frontend presentation layer (the 'head') is decoupled from the backend commerce functionality. This allows you to use a platform like Shopify for the backend while building a custom frontend (or 'Shopify storefront') with any technology you choose."
            },
            {
                question: "Why would I choose a headless approach for Shopify?",
                answer: "A headless approach provides greater design flexibility, potential performance improvements (especially with frameworks like Next.js), and the ability to create unique, content-rich experiences that go beyond what a standard Shopify theme can offer."
            },
            {
                question: "What is Shopify's recommended stack for headless?",
                answer: "Shopify recommends using Hydrogen, their React-based framework for building custom storefronts, and Oxygen for hosting. Hydrogen is optimized to work with the Storefront API and provides a set of pre-built components and hooks."
            },
            {
                question: "Can I use Next.js for a headless Shopify store?",
                answer: "Yes, Next.js is a very popular and powerful choice for building headless Shopify stores. Its features like server-side rendering (SSR) and static site generation (SSG) can lead to excellent performance and SEO."
            },
            {
                question: "How does a headless setup affect Shopify apps?",
                answer: "Many Shopify apps that modify the theme frontend will not work with a headless store. You will need to look for apps that are 'headless-compatible' or build the desired functionality yourself using tools like Shopify App Bridge and the Storefront API."
            },
        ]
    }
];

    