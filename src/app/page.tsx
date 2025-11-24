
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArticles } from '@/lib/shopify';
import { format } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    const { articles } = await getArticles(6);

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
                <div className="mx-auto grid max-w-sm items-start gap-8 pt-12 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                    {articles.map((article: any) => (
                         <Link key={article.id} href={`/blog/${article.handle}`} className="block group">
                            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                                <CardHeader>
                                    <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{article.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {format(new Date(article.publishedAt), 'PPP')}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
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
        category: "Resumes",
        questions: [
            {
                question: "What are the key components of a great resume?",
                answer: "A great resume typically includes your contact information, a professional summary or objective, your work experience with measurable achievements, your education, and relevant skills. Tailoring it to the job you're applying for is crucial."
            },
            {
                question: "How long should my resume be?",
                answer: "For most professionals, a one-page resume is ideal. However, a two-page resume is acceptable if you have over 10 years of experience and your additional experience is relevant to the job. Always prioritize conciseness and relevance."
            },
            {
                question: "What is an ATS and how do I optimize my resume for it?",
                answer: "An Applicant Tracking System (ATS) is software used by recruiters to scan resumes for keywords. To optimize for ATS, use a clean and simple format, include keywords from the job description, and use standard section headings like 'Work Experience'."
            },
            {
                question: "Should I include a cover letter with my application?",
                answer: "Yes, you should almost always include a cover letter unless the application specifically says not to. It's your opportunity to tell a story, explain why you're a great fit for the role, and show your personality beyond what's on your resume."
            },
            {
                question: "What's the difference between a resume and a CV?",
                answer: "A resume is a concise, one-to-two-page summary of your skills and experience. A Curriculum Vitae (CV) is more detailed, often multiple pages long, and includes a comprehensive history of your academic and professional background. CVs are more common in academia and international job markets."
            },
            {
                question: "How do I quantify my achievements on a resume?",
                answer: "Quantify achievements by using numbers, percentages, and data. For example, instead of saying 'Improved sales,' say 'Increased quarterly sales by 15%.' This provides concrete evidence of your impact."
            },
            {
                question: "What are 'soft skills' and which ones should I include?",
                answer: "Soft skills are non-technical skills that relate to how you work. Examples include communication, teamwork, problem-solving, and time management. Include a few that are most relevant to the job description, and be prepared to give examples of how you've used them."
            },
            {
                question: "Should I include hobbies or personal interests on my resume?",
                answer: "Generally, no, unless they are highly relevant to the job. For example, if you're applying for a job at a hiking gear company and you're an avid mountaineer. Otherwise, use the space for more critical professional information."
            },
            {
                question: "What file format should I use to send my resume?",
                answer: "PDF is the best format for sending your resume. It preserves the formatting across all devices and is not easily editable. Avoid using Word documents (.doc/.docx) unless specifically requested."
            },
            {
                question: "Is it okay to have a gap in my work history?",
                answer: "Yes, employment gaps are common. Be prepared to explain it honestly and briefly in a cover letter or interview. You can focus on what you did during that time, such as professional development, volunteering, or personal projects."
            }
        ]
    }
];


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
      <WebStoriesSection />
      <BlogSection />
      <FaqSection />
    </div>
  );
}
