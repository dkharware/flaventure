import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, FileText, Briefcase, UserCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const categories = [
  { name: 'Modern', icon: <Briefcase /> },
  { name: 'Creative', icon: <Star /> },
  { name: 'Corporate', icon: <UserCircle /> },
  { name: 'Simple', icon: <FileText /> },
];

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'Marketing Manager',
    quote: 'EasyFreeCV made it incredibly easy to create a professional-looking resume in minutes. The AI suggestions were a game-changer!',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'woman portrait',
  },
  {
    name: 'Michael B.',
    title: 'Software Developer',
    quote: 'I loved the variety of templates, especially the tech-focused ones. I finally have a resume that stands out.',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'man portrait',
  },
  {
    name: 'Jessica P.',
    title: 'Recent Graduate',
    quote: 'As a recent graduate, I was struggling with my resume. EasyFreeCV helped me highlight my skills and projects perfectly.',
    avatar: 'https://placehold.co/100x100.png',
    hint: 'woman professional',
  },
];

const faqs = [
  {
    question: 'Is EasyFreeCV free to use?',
    answer: 'Yes, our basic features, including access to all templates and the resume editor, are completely free. We believe everyone should have access to tools that help them succeed.',
  },
  {
    question: 'How does the AI content suggestion work?',
    answer: 'Our AI analyzes your job title and any information you provide to suggest relevant skills, summary descriptions, and even hobbies that align with your career profile and the template you\'ve chosen.',
  },
  {
    question: 'Can I download my resume as a PDF?',
    answer: 'Absolutely! Once you are happy with your resume, you can easily download a high-quality PDF version with a single click, ready for you to send to recruiters.',
  },
  {
    question: 'Are the templates customizable?',
    answer: 'Yes, all content within the templates is fully customizable. You can add, edit, or remove sections to tailor the resume to your specific needs and personal brand.',
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 xl:py-56 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                Craft Your Perfect Resume with EasyFreeCV
              </h1>
              <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                Choose from dozens of professional templates, get AI-powered content suggestions, and create a standout resume in minutes.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/templates">
                  Create Your Resume Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Find the Perfect Template for Your Industry</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                We have a wide range of resume templates to suit any profession or style.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:grid-cols-4">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="text-primary">{React.cloneElement(category.icon, { size: 32 })}</div>
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">Professionally designed {category.name.toLowerCase()} templates.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline tracking-tighter text-center sm:text-4xl">Loved by Professionals Worldwide</h2>
          <p className="mx-auto max-w-[700px] text-center text-muted-foreground md:text-xl/relaxed mt-2">
            See what our users are saying about EasyFreeCV.
          </p>
          <div className="mx-auto grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <UserCircle className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="mt-4 font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
