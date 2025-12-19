
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Dietary Preference Filter | Flaventure Tools',
    description: 'Find restaurants and dishes that cater to your dietary preferences (Veg, Vegan, etc.). Tool coming soon.',
};

export default function DietaryFilterPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Dietary Preference Filter' },
    ];

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />
            
             <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl md:text-4xl font-headline">Veg/Vegan/Non-Veg Filter</CardTitle>
                    <CardDescription className="text-lg mt-2">
                       This tool will help you find restaurants and dishes that cater to your specific dietary preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center space-y-6 py-16">
                    <Construction className="h-16 w-16 text-primary" />
                    <h3 className="text-2xl font-bold">Tool Coming Soon!</h3>
                    <p className="text-muted-foreground max-w-md">We are building this feature to make finding food that fits your lifestyle easier. Please check back later!</p>
                    <Button asChild>
                        <a href="/tools">Back to Tools</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
