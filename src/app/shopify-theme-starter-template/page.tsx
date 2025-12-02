
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Shopify Theme Starter (Dawn-based)',
    description: 'A lightweight starter theme based on Shopify\'s Dawn, perfect for starting a new custom theme project.',
};

export default function ShopifyThemeStarterPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Templates', href: '/shopify-templates-boilerplates' },
        { label: 'Shopify Theme Starter' },
    ];

    return (
        <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-headline">Shopify Theme Starter (Dawn-based)</CardTitle>
                    <CardDescription className="text-lg">
                        A lightweight and clean starter theme based on Shopify's Dawn. It's stripped of all non-essential code, making it the perfect foundation for starting a new custom theme project from scratch.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                        <p>This template is coming soon. It will provide a minimal, performance-optimized starting point for your next Shopify theme build.</p>
                        <h3>Features will include:</h3>
                        <ul>
                            <li>Based on Shopify's official Dawn theme.</li>
                            <li>Minimal styling to allow for complete customization.</li>
                            <li>Online Store 2.0 compatible with JSON templates.</li>
                            <li>Optimized for performance and accessibility.</li>
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
