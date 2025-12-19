
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LayoutTemplate, Code } from 'lucide-react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const templates = [
    {
        title: 'Next.js Shopify Starter',
        description: 'A production-ready boilerplate for building headless Shopify storefronts with Next.js.',
        href: '/nextjs-shopify-starter-template',
        icon: <LayoutTemplate className="h-6 w-6" />,
    },
    {
        title: 'Shopify Theme Starter',
        description: 'A lightweight and clean starter theme based on Shopify\'s Dawn, perfect for new custom projects.',
        href: '/shopify-theme-starter-template',
        icon: <LayoutTemplate className="h-6 w-6" />,
    },
    {
        title: 'Shopify Liquid Snippets',
        description: 'A collection of useful and reusable Liquid snippets for common theme development tasks.',
        href: '/shopify-liquid-snippets-pack',
        icon: <Code className="h-6 w-6" />,
    },
];

export function FeaturedTemplates() {
    return (
        <section className="w-full py-8 md:py-12 promo-gradient-bg">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-black">Templates & Boilerplates</h2>
                        <p className="max-w-[700px] text-slate-700 md:text-xl/relaxed">
                           Kickstart your next Shopify project with our free, production-ready code templates.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-stretch gap-8 pt-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    {templates.map((template) => (
                        <Link key={template.title} href={template.href} className="block group">
                            <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-background/80">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        {template.icon}
                                    </div>
                                    <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors">{template.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{template.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                 <div className="mt-8 flex justify-center">
                    <Button asChild>
                        <Link href="/shopify-templates-boilerplates">
                            Browse All Templates <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
