import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, FileText, Briefcase, UserCircle, LucideProps } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeroBanner } from '@/components/HeroBanner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const categories: { name: string; icon: React.FC<LucideProps>; bgColor: string; iconColor: string; borderColor: string; }[] = [
  { name: 'Modern', icon: Briefcase, bgColor: 'bg-blue-100/50', iconColor: 'text-blue-600', borderColor: 'border-blue-200' },
  { name: 'Creative', icon: Star, bgColor: 'bg-green-100/50', iconColor: 'text-green-600', borderColor: 'border-green-200' },
  { name: 'Corporate', icon: UserCircle, bgColor: 'bg-purple-100/50', iconColor: 'text-purple-600', borderColor: 'border-purple-200' },
  { name: 'Simple', icon: FileText, bgColor: 'bg-red-100/50', iconColor: 'text-red-600', borderColor: 'border-red-200' },
];

const testimonials = [
  {
    name: 'Priya S.',
    title: 'Marketing Head',
    quote: 'ResumeFlow made it incredibly simple to create a professional resume. The AI suggestions for my marketing profile were spot on!',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'woman portrait',
  },
  {
    name: 'Rohan K.',
    title: 'Software Engineer, Bangalore',
    quote: 'As a developer, I appreciated the clean, tech-focused templates. I got my resume ready in minutes for a job application in Bengaluru.',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'man portrait',
  },
  {
    name: 'David L.',
    title: 'Graphic Designer',
    quote: 'The creative templates are fantastic! I could finally make a resume that reflects my design skills. The process was so intuitive.',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'man graphic designer',
  },
  {
    name: 'Aisha M.',
    title: 'B.Com Graduate',
    quote: 'Being a recent graduate from Mumbai, I was unsure how to structure my resume. ResumeFlow was a lifesaver!',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'woman professional',
  },
  {
    name: 'Vikram Rao',
    title: 'Project Manager',
    quote: 'The templates are top-notch and the interface is very user-friendly. Highly recommended for anyone looking to make a great first impression.',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'professional man',
  },
  {
    name: 'Sneha Gupta',
    title: 'UX Designer',
    quote: 'I love the creative templates! They allowed me to showcase my portfolio in a visually appealing way. The AI helper was a bonus.',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'woman creative',
  },
];

const faqs = [
  {
    question: 'Is ResumeFlow free to use for creating a resume?',
    answer: 'Yes, our basic features, including access to all free resume templates and the CV editor, are completely free. We believe everyone should have access to tools that help them succeed.',
  },
  {
    question: 'How does the AI content suggestion work for my CV?',
    answer: 'Our AI analyzes your job title and any information you provide to suggest relevant skills, summary descriptions, and even hobbies that align with your career profile and the CV template you\'ve chosen.',
  },
  {
    question: 'Can I download my resume as a PDF?',
    answer: 'Absolutely! Once you are happy with your free resume, you can easily download a high-quality PDF version with a single click, ready for you to send to recruiters.',
  },
  {
    question: 'Are the CV letter templates customizable?',
    answer: 'Yes, all content within the templates, including the CV letter example, is fully customizable. You can add, edit, or remove sections to tailor the document to your specific needs.',
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroBanner />

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Find the Perfect CV Template for Your Industry</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                We have a wide range of CV and resume templates to suit any profession or style, including CV letter examples.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:grid-cols-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.name} href={`/templates?category=${category.name}`} className="block h-full">
                  <div className={`flex flex-col items-center space-y-2 rounded-lg border p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 h-full ${category.bgColor} ${category.borderColor}`}>
                    <div className={`${category.iconColor}`}><IconComponent size={32} /></div>
                    <h3 className="text-lg font-bold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">Professionally designed {category.name.toLowerCase()} templates.</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline tracking-tighter text-center sm:text-4xl">Loved by Professionals Worldwide</h2>
          <p className="mx-auto max-w-[700px] text-center text-muted-foreground md:text-xl/relaxed mt-2">
            See what our users are saying about our free resume builder.
          </p>
          <div className="relative mt-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col">
                        <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                          <Image
                            src={testimonial.avatar}
                            data-ai-hint={testimonial.hint}
                            alt={`Avatar of ${testimonial.name}`}
                            width={80}
                            height={80}
                            className="rounded-full mb-4"
                          />
                           <p className="text-sm text-muted-foreground flex-grow">"{testimonial.quote}"</p>
                          <div className="mt-4">
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 md:left-[-50px] hidden sm:flex" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 md:right-[-50px] hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline tracking-tighter text-center sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mx-auto mt-8 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
