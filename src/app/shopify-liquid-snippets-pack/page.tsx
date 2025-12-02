
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Shopify Liquid Snippets Pack',
    description: 'A collection of useful and reusable Liquid snippets for common Shopify theme development tasks.',
};

export default function LiquidSnippetsPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Templates', href: '/shopify-templates-boilerplates' },
        { label: 'Liquid Snippets Pack' },
    ];

    return (
        <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            
             <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-headline">Shopify Liquid Snippets Pack</CardTitle>
                    <CardDescription className="text-lg">
                       A collection of useful and reusable Liquid snippets for common tasks, such as creating custom sliders, tabs, and product variant swatches.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                        <p>This collection of Liquid snippets is coming soon. It will help you accelerate your theme development by providing ready-to-use code for common e-commerce features.</p>
                        <h3>Snippets will include:</h3>
                        <ul>
                            <li>Product variant swatches</li>
                            <li>Custom image sliders/carousels</li>
                            <li>Accordion tabs for product descriptions</li>
                            <li>Recently viewed products section</li>
                        </ul>
                    </div>
                    <Button disabled>
                        <Download className="mr-2 h-4 w-4" /> Coming Soon
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
