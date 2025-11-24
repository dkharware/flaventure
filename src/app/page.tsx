'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArticles } from '@/lib/shopify';
import { format } from 'date-fns';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

gsap.registerPlugin(ScrollTrigger);

function BlogSection() {
    const [articles, setArticles] = React.useState<any[]>([]);

    React.useEffect(() => {
        getArticles(6).then(({ articles }) => setArticles(articles));
    }, []);

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

const faqData = {
    shopify: [
        {
            question: "What is Shopify and how can it help my business?",
            answer: "Shopify is a complete e-commerce platform that lets you start, grow, and manage a business. It allows you to create an online store, sell in multiple places (web, mobile, social media), manage products and inventory, and process payments."
        },
        {
            question: "How do I set up a blog on Shopify?",
            answer: "Shopify comes with a built-in blogging engine. You can add a new blog from your Shopify admin under 'Online Store' > 'Blog Posts'. From there, you can create and manage your posts, which is a great way to improve SEO and engage with your customers."
        },
    ],
    resumes: [
        {
            question: "What are the key components of a great resume?",
            answer: "A great resume typically includes your contact information, a professional summary or objective, your work experience with measurable achievements, your education, and relevant skills. Tailoring it to the job you're applying for is crucial."
        },
        {
            question: "How long should my resume be?",
            answer: "For most professionals, a one-page resume is ideal. However, a two-page resume is acceptable if you have over 10 years of experience and your additional experience is relevant to the job. Always prioritize conciseness and relevance."
        }
    ]
};


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
                <div className="mx-auto max-w-3xl pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <div>
                            <h3 className="font-bold text-lg mb-4">Shopify</h3>
                            <Accordion type="single" collapsible className="w-full">
                                {faqData.shopify.map((item) => (
                                    <AccordionItem value={item.question} key={item.question}>
                                        <AccordionTrigger>{item.question}</AccordionTrigger>
                                        <AccordionContent>{item.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                        <div>
                             <h3 className="font-bold text-lg mb-4">Resumes</h3>
                             <Accordion type="single" collapsible className="w-full">
                                {faqData.resumes.map((item) => (
                                    <AccordionItem value={item.question} key={item.question}>
                                        <AccordionTrigger>{item.question}</AccordionTrigger>
                                        <AccordionContent>{item.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home() {

  useGSAP(() => {
    gsap.from('.hero-element', {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: 'power3.out',
    });

    const sections = gsap.utils.toArray('.scroll-section');
    sections.forEach((section: any) => {
      gsap.from(section.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    });
  }, []);


  return (
    <div className="w-full">
       <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-red-50/50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d1eaff,transparent)] opacity-30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_0px,#ffd5d5,transparent)] opacity-30"></div>
        </div>
        <div className="container px-6 md:px-10 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground hero-element">
                  Welcome to Our Blog
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl hero-element">
                  Discover insightful articles, tutorials, and the latest trends in our industry.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row hero-element">
                <Button asChild size="lg" variant="default">
                    <Link href="/blog">
                     Explore Articles <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                </div>
            </div>
        </div>
    </section>

      <BlogSection />
      <FaqSection />
    </div>
  );
}
