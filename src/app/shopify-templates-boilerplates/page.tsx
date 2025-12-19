
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Github } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Free Shopify Templates & Boilerplates for Developers',
    description: 'Download free, production-ready Shopify templates, boilerplates, and starters. Includes Next.js starters, theme starters, Liquid snippets, and more for faster development.',
    keywords: ['Shopify templates', 'Shopify boilerplate', 'Shopify Next.js starter', 'Shopify theme starter', 'free Shopify code templates', 'Shopify theme boilerplate', 'Shopify hydrogen starter'],
};

const templates = [
    {
        title: 'Next.js Shopify Starter Template',
        description: 'A production-ready boilerplate for building headless Shopify storefronts with Next.js, Tailwind CSS, and the Storefront API. Includes pre-configured cart, checkout, and product fetching.',
        href: '/nextjs-shopify-starter-template',
        githubUrl: '#',
        tags: ['Next.js', 'Headless', 'Storefront API', 'Tailwind CSS'],
    },
    {
        title: 'Shopify Theme Starter (Dawn-based)',
        description: 'A lightweight and clean starter theme based on Shopify\'s Dawn. Stripped of all non-essential code, perfect for starting a new custom theme project.',
        href: '/shopify-theme-starter-template',
        githubUrl: '#',
        tags: ['Theme', 'Liquid', 'OS 2.0'],
    },
    {
        title: 'Shopify Liquid Snippets Pack',
        description: 'A collection of useful and reusable Liquid snippets for common tasks, such as creating custom sliders, tabs, and product variant swatches.',
        href: '/shopify-liquid-snippets-pack',
        githubUrl: '#',
        tags: ['Liquid', 'Snippets', 'Theme Development'],
    },
    {
        title: 'Shopify Hydrogen Starter Kit',
        description: 'Kickstart your next Shopify Hydrogen project with this starter kit. Includes basic page setup, product queries, and cart functionality out of the box.',
        href: '/shopify-hydrogen-starter',
        githubUrl: '#',
        tags: ['Hydrogen', 'React', 'Headless'],
    },
    {
        title: 'Shopify Tailwind CSS Theme Template',
        description: 'An Online Store 2.0 theme boilerplate that integrates Tailwind CSS seamlessly, complete with a build process for production-ready assets.',
        href: '/shopify-tailwind-theme-template',
        githubUrl: '#',
        tags: ['Tailwind CSS', 'Theme', 'JIT'],
    },
];

export default function TemplatesHubPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Templates & Boilerplates' },
    ];

    return (
        <>
            <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <Breadcrumbs items={breadcrumbItems} />
                    <div className="text-center my-8">
                        <h1 className="text-4xl md:text-5xl font-headline font-bold">Shopify Templates & Boilerplates</h1>
                        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                           A hub for developers to download free, production-ready code templates—including Next.js starters, theme boilerplates, and Liquid snippets—to kickstart their next Shopify project.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <Card key={template.title} className="flex flex-col bg-background/50 backdrop-blur-lg">
                            <CardHeader>
                                <CardTitle>{template.title}</CardTitle>
                                <CardDescription>{template.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-end">
                                 <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags.map(tag => (
                                        <div key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">{tag}</div>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-auto">
                                    <Button asChild className="w-full">
                                        <Link href={template.href}>
                                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
