
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Shopify Hydrogen Starter Kit',
    description: 'Kickstart your next Shopify Hydrogen project with this starter kit, including basic setup and functionality.',
};

export default function HydrogenStarterPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Templates', href: '/shopify-templates-boilerplates' },
        { label: 'Hydrogen Starter Kit' },
    ];

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            
             <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-headline">Shopify Hydrogen Starter Kit</CardTitle>
                    <CardDescription className="text-lg">
                       Kickstart your next Shopify Hydrogen project with this starter kit. Includes basic page setup, product queries, and cart functionality out of the box.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                        <p>This starter kit for Shopify's Hydrogen framework is coming soon. Hydrogen is Shopify's recommended React-based framework for building fast, custom storefronts.</p>
                        <h3>Features will include:</h3>
                        <ul>
                            <li>Optimized for Shopify's Storefront API.</li>
                            <li>Pre-configured routes for products, collections, and cart.</li>
                            <li>Server and client components for optimal performance.</li>
                            <li>Ready for deployment on Oxygen, Shopify's hosting platform.</li>
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
