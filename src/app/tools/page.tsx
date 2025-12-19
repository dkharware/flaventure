
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Sparkles, Wrench, Code, FileJson, BookOpen, ScrollText
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Tools & Guides for Travelers & Food Bloggers | Flaventure',
    description: 'A curated collection of free tools designed for travelers and food bloggers, including a travel budget calculator, packing checklist generator, and food photography helper.',
    keywords: ['travel tools', 'food blogger tools', 'travel budget calculator', 'packing checklist', 'food photography'],
};

const bloggerTools = [
    { icon: <Sparkles />, title: 'AI Content Generator', description: 'Generate blog post ideas, engaging descriptions, and social media copy.', href: '/tools/shopify-ai-content-generator' },
    { icon: <Wrench />, title: 'Meta Tag Generator', description: 'Create SEO-friendly meta tags to improve search visibility.', href: '/tools/meta-tag-generator' },
    { icon: <Code />, title: 'Recipe Schema Generator', description: 'Get rich snippets for your recipes in Google search results.', href: '/tools/recipe-schema-generator' },
    { icon: <Wrench />, title: 'Packing Checklist Generator', description: 'Create a customized packing list for your next trip.', href: '/tools/packing-checklist-generator' },
    { icon: <Code />, title: 'Travel Budget Calculator', description: 'Estimate costs for flights, accommodation, and activities.', href: '/tools/travel-budget-calculator' },
    { icon: <Sparkles />, title: 'Food Photography Helper', description: 'A simple guide with tips for taking better food photos.', href: '/tools/food-photography-helper' },
];

const ToolCard = ({ tool }: { tool: any }) => (
    <Card className="flex flex-col bg-background/50 backdrop-blur-lg h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <Link href={tool.href || '#'} className="flex flex-col h-full group p-6">
            <div className="flex items-center gap-4 mb-2">
                <div className="text-primary">{tool.icon}</div>
                <CardTitle className="group-hover:text-primary transition-colors text-base font-bold">{tool.title}</CardTitle>
            </div>
            <CardDescription className="text-xs flex-grow">{tool.description}</CardDescription>
        </Link>
    </Card>
);

export default function ToolsPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools' },
    ];

    return (
        <>
            <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <Breadcrumbs items={breadcrumbItems} />
                    <div className="text-center my-8">
                        <h1 className="text-4xl md:text-5xl font-headline font-bold">Tools & Guides</h1>
                        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                            A suite of free tools and guides to help you create better content, plan your travels, and optimize your blog.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
                <section id="blogger-tools" className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-headline">🛠️ Tools for Bloggers & Travelers</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                           This collection of tools is crafted to streamline your content creation process, enhance your SEO, and help you plan your adventures.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bloggerTools.map((tool) => (
                             <ToolCard key={tool.title} tool={tool} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
