
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Map, Plane, Wallet, CheckSquare, Globe, CircleDollarSign, Cloud, Route, Hotel, Ticket,
    UtensilsCrossed, MapPin, Soup, HandPlatter, Vegan, Wheat, Flame, Camera, Lightbulb, AtSign
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Tools for Travel & Food Bloggers | Flaventure',
    description: 'A curated collection of over 20 free tools designed for travelers and food bloggers, including trip planners, budget calculators, content generators, and more.',
    keywords: ['travel tools', 'food blogger tools', 'trip planner', 'travel budget calculator', 'content ideas', 'free tools for bloggers'],
};

const travelTools = [
    { icon: <Map />, title: 'Trip Planner Tool', description: 'Organize your itinerary, bookings, and notes in one place.', status: 'Coming Soon' },
    { icon: <Wallet />, title: 'Travel Budget Calculator', description: 'Estimate your trip costs for flights, accommodation, and daily expenses.', status: 'Coming Soon' },
    { icon: <Plane />, title: 'Best Time to Visit Finder', description: 'Discover the ideal season to visit any destination based on weather and crowds.', status: 'Coming Soon' },
    { icon: <CheckSquare />, title: 'Packing Checklist Generator', description: 'Create a customized packing list based on your destination and activities.', status: 'Coming Soon' },
    { icon: <Globe />, title: 'Visa Requirement Checker', description: 'Quickly check the visa requirements for your passport and destination.', status: 'Coming Soon' },
    { icon: <CircleDollarSign />, title: 'Currency Converter', description: 'Get real-time exchange rates for currencies around the world.', status: 'Coming Soon' },
    { icon: <Cloud />, title: 'Weather Forecast Tool', description: 'Get a 7-day weather forecast for any city or travel destination.', status: 'Coming Soon' },
    { icon: <Route />, title: 'Route & Distance Finder', description: 'Plan your road trips and calculate distances between multiple points.', status: 'Coming Soon' },
    { icon: <Hotel />, title: 'Hotel Price Comparison Tool', description: 'Compare hotel prices from various booking sites to find the best deal.', status: 'Coming Soon' },
    { icon: <Ticket />, title: 'Flight Deals Finder', description: 'Search for the cheapest flights across multiple airlines and dates.', status: 'Coming Soon' }
];

const foodTools = [
    { icon: <Lightbulb />, title: 'AI Content Generator', description: 'Generate blog post ideas, engaging descriptions, and social media copy.', href: '/tools/shopify-ai-content-generator' },
    { icon: <AtSign />, title: 'Meta Tag Generator', description: 'Create SEO-friendly meta tags to improve search visibility.', href: '/tools/meta-tag-generator' },
    { icon: <Soup />, title: 'Recipe Schema Generator', description: 'Get rich snippets for your recipes in Google search results.', href: '/tools/recipe-schema-generator' },
    { icon: <MapPin />, title: 'Street Food Map', description: 'Discover the best street food stalls and local markets in cities worldwide.', status: 'Coming Soon' },
    { icon: <HandPlatter />, title: 'Must-Try Dishes Finder', description: 'Find the most iconic and must-try dishes for any destination you visit.', status: 'Coming Soon' },
    { icon: <UtensilsCrossed />, title: 'Restaurant Price Guide', description: 'Get an idea of meal prices to help you budget for dining out.', status: 'Coming Soon' },
    { icon: <Vegan />, title: 'Veg/Vegan/Non-Veg Filter', description: 'Find restaurants and dishes that cater to your dietary preferences.', status: 'Coming Soon' },
    { icon: <Wheat />, title: 'Food Allergy Checker', description: 'Check for common allergens in local dishes and communicate your needs.', status: 'Coming Soon' },
    { icon: <Flame />, title: 'Spice Level Guide', description: 'Understand the spice levels of different cuisines and dishes.', status: 'Coming Soon' },
    { icon: <Camera />, title: 'Food Photography Helper', description: 'Get tips and settings suggestions for taking beautiful food photos.', status: 'Coming Soon' },
];

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
                        <h1 className="text-4xl md:text-5xl font-headline font-bold">Travel & Food Blogger Tools</h1>
                        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                            A complete suite of free tools to help you plan your next trip, discover amazing food, and create better content for your blog.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
                <section id="travel-tools">
                    <h2 className="text-3xl font-bold font-headline mb-8 text-center">🏆 Top Tools for Travel Planning</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {travelTools.map((tool) => (
                             <Card key={tool.title} className="flex flex-col bg-background/50 backdrop-blur-lg">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="text-primary">{tool.icon}</div>
                                        <CardTitle>{tool.title}</CardTitle>
                                    </div>
                                    <CardDescription>{tool.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-end">
                                    {tool.status && <Badge variant="outline">{tool.status}</Badge>}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="food-tools" className="mt-16">
                    <h2 className="text-3xl font-bold font-headline mb-8 text-center">🍽️ Food & Blogger-Focused Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foodTools.map((tool) => (
                             <Card key={tool.title} className="flex flex-col bg-background/50 backdrop-blur-lg transition-all hover:shadow-lg hover:-translate-y-1">
                                <Link href={tool.href || '#'} className="flex flex-col h-full">
                                    <CardHeader>
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="text-primary">{tool.icon}</div>
                                            <CardTitle className="group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                                        </div>
                                        <CardDescription>{tool.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col justify-end">
                                        {tool.status && <Badge variant="outline">{tool.status}</Badge>}
                                        {!tool.status && <Badge variant="secondary">Available Now</Badge>}
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
