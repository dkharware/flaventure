
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Restaurant Price Guide | Flaventure Tools',
    description: 'Get an idea of meal prices to help you budget for dining out. Tool coming soon.',
};

export default function RestaurantPriceGuidePage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Restaurant Price Guide' },
    ];

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            
             <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl md:text-4xl font-headline">Restaurant Price Guide</CardTitle>
                    <CardDescription className="text-lg mt-2">
                       This tool will give you an idea of meal prices in different cities to help you budget for dining out.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center space-y-6 py-16">
                    <Construction className="h-16 w-16 text-primary" />
                    <h3 className="text-2xl font-bold">Tool Coming Soon!</h3>
                    <p className="text-muted-foreground max-w-md">We're gathering data to make your dining budget planning easier. This tool is under construction, so check back soon!</p>
                    <Button asChild>
                        <a href="/tools">Back to Tools</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
