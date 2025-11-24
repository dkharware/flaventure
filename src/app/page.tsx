
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArticles, getAllTags } from '@/lib/shopify';
import { format } from 'date-fns';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from '@/components/ui/badge';
import { FaqClient } from '@/components/FaqClient';
import { Hero } from '@/components/Hero';
import { BlogTags } from '@/components/BlogTags';

async function WebStoriesSection() {
    const { articles } = await getArticles(8);

    if (!articles || articles.length === 0) {
        return null;
    }
    
    return (
      <section className="w-full py-12 md:py-24 scroll-section">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                  <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Web Stories</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                      Discover our latest articles in a visual, story-like format.
                  </p>
              </div>
          </div>
          <div className="mx-auto max-w-5xl pt-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {articles.map((article: any) => (
                  <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                     <Link href={`/blog/${article.handle}`} className="block group">
                        <div className="relative aspect-[4/5] w-full h-auto rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                           {article.image && (
                              <Image
                                src={article.image.url}
                                alt={article.image.altText || article.title}
                                fill
                                className="object-cover"
                              />
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                           <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                              <h3 className="text-white font-bold text-2xl leading-tight drop-shadow-md line-clamp-3">{article.title}</h3>
                              <div
                                className="text-white/80 text-sm mt-2 line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: article.excerptHtml }}
                               />
                               <div className="mt-4">
                                  <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm border-none">
                                    {format(new Date(article.publishedAt), 'PPP')}
                                  </Badge>
                               </div>
                           </div>
                        </div>
                     </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>
    );
}


async function BlogSection() {
    const { articles } = await getArticles(9);

    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20 scroll-section">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Latest Articles</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           Stay up to date with the latest news, tips, and insights.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-5xl pt-12">
                   <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        {articles.map((article: any) => (
                           <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                             <Link href={`/blog/${article.handle}`} className="block group h-full">
                                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                    {article.image && (
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                            src={article.image.url}
                                            alt={article.image.altText || article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col flex-grow">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{article.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(article.publishedAt), 'PPP')}
                                            </p>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Link>
                           </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="hidden md:flex" />
                      <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </div>
                 <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/blog">
                            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

const faqData = [
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
            {
                question: "What is Shopify POS?",
                answer: "Shopify POS (Point of Sale) is an application that allows you to sell your products in person, such as at a retail store, market, or pop-up shop. Your inventory and sales are automatically synced between your online and physical stores."
            },
            {
                question: "Can I sell digital products on Shopify?",
                answer: "Absolutely. Shopify is great for selling digital products like e-books, music, online courses, and software. You can use apps from the Shopify App Store to handle digital downloads and licensing."
            },
            {
                question: "How can I improve my Shopify store's SEO?",
                answer: "Shopify has built-in SEO features. To improve your ranking, use descriptive titles and meta descriptions, organize your site structure logically, add alt text to images, and create quality content for your blog."
            },
            {
                question: "What is the Shopify App Store?",
                answer: "The Shopify App Store offers thousands of apps to add new features and functionality to your store. You can find apps for marketing, customer service, inventory management, shipping, and much more."
            },
            {
                question: "Is Shopify good for beginners?",
                answer: "Yes, Shopify is known for its user-friendly interface, making it an excellent choice for beginners. It offers extensive documentation, 24/7 customer support, and a large community to help you get started."
            }
        ]
    },
    {
        category: "Theme & App",
        questions: [
            {
                question: "What is Liquid?",
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
                question: "How do I use the theme customizer?",
                answer: "The Shopify theme customizer is a user-friendly interface in the Shopify admin that allows merchants to change the look and feel of their store without editing code. It works by modifying the settings defined in the theme's schema files."
            },
            {
                question: "What is the Shopify Theme Kit?",
                answer: "Theme Kit was the predecessor to the Shopify CLI for local theme development. While it's still functional, Shopify now recommends using the Shopify CLI for all new projects as it's more powerful and better integrated."
            },
            {
                question: "How can I optimize a Shopify theme for performance?",
                answer: "To optimize performance, you should minimize the use of large images, reduce the number of HTTP requests, minify CSS and JavaScript files, use lazy loading for images and videos, and avoid using too many third-party apps."
            },
            {
                question: "What is the `schema` tag in a section file?",
                answer: "The `{% schema %}` tag contains a JSON object that defines the settings for a theme section. These settings appear in the theme customizer, allowing merchants to configure the section's content and appearance."
            },

            {
                question: "What is a Shopify starter theme like Dawn?",
                answer: "Dawn is Shopify's reference theme, built for performance, flexibility, and ease of use. It's a great starting point for custom theme development because it includes all of Shopify's latest features and best practices."
            },
            {
                question: "How do theme app extensions work?",
                answer: "Theme app extensions allow apps to inject content into specific areas of a theme without modifying the theme code directly. This makes installations and uninstallations cleaner and reduces conflicts between apps."
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
                answer: "The Storefront API gives you unauthenticated access to a shop’s data, allowing you to build custom storefronts on any platform (web, mobile, etc.). It provides read-only access to products, collections, and blogs, and supports checkout operations."
            },
            {
                question: "What's the difference between the Admin API and the Storefront API?",
                answer: "The Admin API is used for building apps and integrations for the Shopify admin (e.g., managing products, orders). It requires authentication. The Storefront API is for building custom, public-facing shopping experiences and is largely unauthenticated."
            },
            {
                question: "How do I get a Storefront API access token?",
                answer: "You can get an access token by creating a private app in your Shopify admin or by installing the Headless channel. You must grant the necessary permissions for the API scopes you need (e.g., `unauthenticated_read_product_listings`)."
            },
            {
                question: "Is the Storefront API based on REST or GraphQL?",
                answer: "The Storefront API is based on GraphQL. This allows you to request exactly the data you need in a single API call, making it more efficient than traditional REST APIs."
            },

            {
                question: "How do I handle checkouts with the Storefront API?",
                answer: "You can create and manage checkouts using the Storefront API. This involves creating a checkout, adding line items, and retrieving the checkout URL, which you then direct the customer to for payment completion on Shopify's secure servers."
            },
            {
                question: "Can I use the Storefront API to manage customer accounts?",
                answer: "Yes, the Storefront API has mutations for creating customers, logging them in, and retrieving their information (like order history), allowing you to build a full-featured customer account section in your custom storefront."
            },
            {
                question: "Are there rate limits for the Storefront API?",
                answer: "Yes, the Storefront API has rate limits to ensure stability. The limit is calculated based on a leaky bucket algorithm, which is more flexible than a simple request-per-second limit. The API returns the current cost in the response headers."
            },
            {
                question: "How can I fetch blog articles using the Storefront API?",
                answer: "You can query for blog articles using the `articles` query in GraphQL. You can filter by blog handle, tag, or other parameters, and retrieve the title, content, images, and other article details."
            },
            {
                question: "What is a 'node' in the context of the Shopify GraphQL API?",
                answer: "In Shopify's GraphQL API, a 'node' is any object that has a globally unique ID. This is part of the Relay GraphQL Server Specification, which Shopify's API follows. You can fetch any node directly if you have its ID."
            },
            {
                question: "Is it secure to expose my Storefront API access token on the client-side?",
                answer: "Yes, the public Storefront API access token is designed to be safe to use in a client-side application like a web browser or mobile app. It only grants unauthenticated access to the data you've explicitly allowed."
            }
        ]
    },
    {
        category: "Headless Shopify",
        questions: [
            {
                question: "What does 'headless commerce' mean?",
                answer: "Headless commerce is an architecture where the frontend presentation layer (the 'head') is decoupled from the backend commerce functionality. This allows you to use a platform like Shopify for the backend while building a custom frontend with any technology you choose."
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
                answer: "Many Shopify apps that modify the theme frontend will not work with a headless store. You will need to look for apps that are 'headless-compatible' or build the desired functionality yourself using the Storefront API."
            },
            {
                question: "What are the challenges of a headless Shopify build?",
                answer: "The challenges include increased development complexity, the need to reimplement features that are standard in themes (like cart management), and potential issues with third-party app compatibility. It's a trade-off for greater flexibility."
            },
            {
                question: "How do I handle previews for content editors in a headless setup?",
                answer: "Handling previews can be tricky. Some solutions involve setting up a dedicated preview environment that fetches draft content. Shopify is also improving its support for headless previews through the Headless channel."
            },
            {
                question: "What is the Shopify Headless channel?",
                answer: "The Headless channel is an app you can install in your Shopify admin. It provides a central place to manage your Storefront API access tokens and configure settings for your custom storefront."
            },
            {
                _question: "Can I still use Shopify Payments with a headless store?",
                answer: "Yes. With a headless setup, you use the Storefront API to build a checkout and then redirect the customer to the Shopify checkout URL. They complete their payment on Shopify's secure, hosted checkout page, so you can use Shopify Payments."
            },
            {
                question: "Is headless more expensive than using a Shopify theme?",
                answer: "The development and maintenance costs of a headless store are typically higher than using a pre-built theme due to the increased complexity. However, the Shopify plan costs remain the same."
            }
        ]
    },
    {
        category: "Resume and CV",
        questions: [
            {
                question: "What's the difference between a resume and a CV?",
                answer: "A resume is a concise, one-to-two-page summary of your skills and experience, tailored to a specific job. A Curriculum Vitae (CV) is more detailed, often multiple pages long, and includes a comprehensive history of your academic and professional background. CVs are more common in academia."
            },
            {
                question: "How long should my resume be?",
                answer: "For most professionals, a one-page resume is ideal. A two-page resume is acceptable if you have over 10 years of relevant experience. Always prioritize conciseness."
            },
            {
                question: "What is an ATS and how do I optimize my resume for it?",
                answer: "An Applicant Tracking System (ATS) is software used by recruiters to scan resumes for keywords. To optimize for ATS, use a clean format, include keywords from the job description, and use standard section headings like 'Work Experience'."
            },
            {
                question: "Should I include a cover letter with my application?",
                answer: "Yes, you should almost always include a cover letter unless the application specifically says not to. It's your opportunity to explain why you're a great fit for the role and show your personality beyond your resume."
            },
            {
                question: "How do I quantify my achievements on a resume?",
                answer: "Quantify achievements by using numbers, percentages, and data. For example, instead of saying 'Improved sales,' say 'Increased quarterly sales by 15%.' This provides concrete evidence of your impact."
            },
            {
                question: "What are 'soft skills' and which ones should I include?",
                answer: "Soft skills are non-technical skills like communication, teamwork, and problem-solving. Include a few that are most relevant to the job description and be prepared to give examples."
            },
            {
                question: "Should I include a professional summary or an objective?",
                answer: "A professional summary is generally preferred. It's a brief, 2-3 sentence overview of your key skills and experience. An objective, which states your career goals, can be seen as outdated unless you are making a significant career change."
            },
            {
                question: "What file format should I use to send my resume?",
                answer: "PDF is the best format. It preserves your formatting across all devices and is not easily editable. Avoid using Word documents (.doc/.docx) unless specifically requested."
            },
            {
                question: "Is it okay to have a gap in my work history?",
                answer: "Yes, employment gaps are common. Be prepared to explain it honestly and briefly. You can focus on what you did during that time, such as professional development, volunteering, or personal projects."
            },
            {
                question: "Should I put my address on my resume?",
                answer: "It's no longer necessary to include your full street address. Your city, state, and zip code are sufficient. For remote jobs, you might just list your state or 'Remote'."
            }
        ]
    }
];


async function TagsSection() {
    const tags = await getAllTags();
    return <BlogTags tags={tags} />;
}


function FaqSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 scroll-section">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           Find answers to common questions about Shopify and resume building.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-4xl pt-12">
                   <FaqClient faqData={faqData} />
                </div>
            </div>
        </section>
    );
}

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <TagsSection />
      <WebStoriesSection />
      <BlogSection />
      <FaqSection />
    </div>
  );
}

    
