
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Sparkles, Wrench, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const tools = [
    {
      title: "AI Content Generator",
      href: "/tools/shopify-ai-content-generator",
      icon: <Sparkles className="h-6 w-6" />,
      description: "Generate blog post ideas, engaging descriptions, and social media copy for your travel and food content.",
    },
    {
      title: "Meta Tag Generator",
      href: "/tools/meta-tag-generator",
      icon: <Wrench className="h-6 w-6" />,
      description: "Create SEO-friendly meta tags to improve your blog's search visibility and social sharing.",
    },
    {
      title: "Recipe Schema Generator",
      href: "/tools/recipe-schema-generator",
      icon: <Utensils className="h-6 w-6" />,
      description: "Enhance your recipe posts with rich snippets like ratings, cook time, and nutrition details.",
    },
];

export function FeaturedTools() {
    return (
        <section className="w-full py-8 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Free Blogger Tools</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                           A collection of free tools, including AI content generators and SEO utilities, to speed up your content creation workflow.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-stretch gap-8 pt-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    {tools.map((tool) => (
                        <Link key={tool.title} href={tool.href} className="block group">
                            <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-background/50 backdrop-blur-lg">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        {tool.icon}
                                    </div>
                                    <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{tool.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                 <div className="mt-8 flex justify-center">
                    <Button asChild variant="outline">
                        <Link href="/tools">View All Tools <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
