
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Shopify Tailwind CSS Theme Template',
    description: 'An Online Store 2.0 theme boilerplate that integrates Tailwind CSS seamlessly.',
};

export default function TailwindThemePage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Templates', href: '/shopify-templates-boilerplates' },
        { label: 'Tailwind CSS Theme Template' },
    ];

    return (
        <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            
            <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-headline">Shopify Tailwind CSS Theme Template</CardTitle>
                    <CardDescription className="text-lg">
                       An Online Store 2.0 theme boilerplate that integrates Tailwind CSS seamlessly, complete with a build process for production-ready assets.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                        <p>This template is coming soon. It will provide a ready-to-use Shopify theme environment with Tailwind CSS fully configured.</p>
                        <h3>Features will include:</h3>
                        <ul>
                            <li>Online Store 2.0 compatible structure.</li>
                            <li>Tailwind CSS with JIT (Just-In-Time) compilation.</li>
                            <li>Pre-configured scripts for development and production builds.</li>
                            <li>PurgeCSS for removing unused styles for a smaller footprint.</li>
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
