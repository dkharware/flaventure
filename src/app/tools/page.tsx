
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Map, Plane, Wallet, CheckSquare, Globe, CircleDollarSign, Cloud, Route, Hotel, Ticket,
    UtensilsCrossed, MapPin, Soup, HandPlatter, Vegan, Wheat, Flame, Camera, Lightbulb, AtSign, Hash
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Tools for Travel & Food Bloggers | Flaventure',
    description: 'A curated collection of over 20 free tools designed for travelers and food bloggers, including trip planners, budget calculators, content generators, and more.',
    keywords: ['travel tools', 'food blogger tools', 'trip planner', 'travel budget calculator', 'content ideas', 'free tools for bloggers'],
};

const travelTools = [
    { icon: <Map />, title: 'Trip Planner Tool', description: 'Organize your itinerary, bookings, and notes in one place.', status: 'Coming Soon' },
    { icon: <Wallet />, title: 'Travel Budget Calculator', description: 'Estimate your trip costs for flights, accommodation, and daily expenses.', href: '/tools/travel-budget-calculator' },
    { icon: <Plane />, title: 'Best Time to Visit Finder', description: 'Discover the ideal season to visit any destination based on weather and crowds.', status: 'Coming Soon' },
    { icon: <CheckSquare />, title: 'Packing Checklist Generator', description: 'Create a customized packing list based on your destination and activities.', href: '/tools/packing-checklist-generator' },
    { icon: <Globe />, title: 'Visa Requirement Checker', description: 'Quickly check the visa requirements for your passport and destination.', status: 'Coming Soon' },
    { icon: <CircleDollarSign />, title: 'Currency Converter', description: 'Get real-time exchange rates for currencies around the world.', status: 'Coming Soon' },
    { icon: <Cloud />, title: 'Weather Forecast Tool', description: 'Get a 7-day weather forecast for any city or travel destination.', status: 'Coming Soon' },
    { icon: <Route />, title: 'Route & Distance Finder', description: 'Plan your road trips and calculate distances between multiple points.', status: 'Coming Soon' },
    { icon: <Hotel />, title: 'Hotel Price Comparison Tool', description: 'Compare hotel prices from various booking sites to find the best deal.', status: 'Coming Soon' },
    { icon: <Ticket />, title: 'Flight Deals Finder', description: 'Search for the cheapest flights across multiple airlines and dates.', status: 'Coming Soon' }
];

const foodTools = [
    { icon: <Lightbulb />, title: 'Content Ideas Generator', description: 'Generate blog post ideas, engaging descriptions, and social media copy.', href: '/tools/shopify-ai-content-generator' },
    { icon: <AtSign />, title: 'Meta Tag Generator', description: 'Create SEO-friendly meta tags to improve search visibility.', href: '/tools/meta-tag-generator' },
    { icon: <Soup />, title: 'Recipe Schema Generator', description: 'Get rich snippets for your recipes in Google search results.', href: '/tools/recipe-schema-generator' },
    { icon: <MapPin />, title: 'Local Food Finder', description: 'Discover the best local dishes and restaurants in cities worldwide.', status: 'Coming Soon' },
    { icon: <HandPlatter />, title: 'Must-Try Dishes Finder', description: 'Find the most iconic and must-try dishes for any destination you visit.', status: 'Coming Soon' },
    { icon: <UtensilsCrossed />, title: 'Restaurant Price Guide', description: 'Get an idea of meal prices to help you budget for dining out.', status: 'Coming Soon' },
    { icon: <Vegan />, title: 'Veg/Vegan/Non-Veg Filter', description: 'Find restaurants and dishes that cater to your dietary preferences.', status: 'Coming Soon' },
    { icon: <Wheat />, title: 'Food Allergy Checker', description: 'Check for common allergens in local dishes and communicate your needs.', status: 'Coming Soon' },
    { icon: <Flame />, title: 'Spice Level Guide', description: 'Understand the spice levels of different cuisines and dishes.', status: 'Coming Soon' },
    { icon: <Camera />, title: 'Food Photography Helper', description: 'Get tips and settings suggestions for taking beautiful food photos.', href: '/tools/food-photography-helper' },
    { icon: <Hash />, title: 'Hashtag & Caption Generator', description: 'Generate engaging captions and relevant hashtags for your social media posts.', status: 'Coming Soon' },
];

const ToolCard = ({ tool }: { tool: any }) => (
    <Card className="flex flex-col bg-background/50 backdrop-blur-lg h-full">
        <Link href={tool.href || '#'} className="flex flex-col h-full group p-6">
            <div className="flex items-center gap-4 mb-2">
                <div className="text-primary">{tool.icon}</div>
                <CardTitle className="group-hover:text-primary transition-colors text-base font-bold">{tool.title}</CardTitle>
            </div>
            <CardDescription className="text-xs flex-grow">{tool.description}</CardDescription>
            <div className="mt-4">
                {tool.status && <Badge variant="outline">{tool.status}</Badge>}
                {!tool.status && <Badge variant="secondary">Available Now</Badge>}
            </div>
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
                        <h1 className="text-4xl md:text-5xl font-headline font-bold">Travel & Food Blogger Tools</h1>
                        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                            A complete suite of free tools to help you plan your next trip, discover amazing food, and create better content for your blog.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
                <section id="travel-tools" className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-headline">✈️ Tools for Seamless Travel Planning</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                            The secret to a stress-free adventure is meticulous planning. These tools are designed to take the guesswork out of your travel preparations, from budgeting and packing to finding the best flights. Spend less time organizing and more time exploring.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {travelTools.map((tool) => (
                             <ToolCard key={tool.title} tool={tool} />
                        ))}
                    </div>
                </section>

                <section id="food-tools">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-headline">🍽️ Tools for Savvy Foodies & Bloggers</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                           Great content is the heart of any successful blog. This collection of tools is crafted to streamline your content creation process, enhance your SEO, and help you find the most delicious and authentic food experiences wherever you go.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {foodTools.map((tool) => (
                             <ToolCard key={tool.title} tool={tool} />
                        ))}
                    </div>
                </section>
                
                <div className="prose dark:prose-invert max-w-4xl mx-auto mt-24">
                    <Card className="mt-8 bg-background/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">How to Supercharge Your Blog with These Free Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>Running a successful travel and food blog is more than just writing about your experiences—it's about planning, creating, optimizing, and engaging. The right set of tools can be a game-changer, transforming your passion project into a professional publication. This guide will walk you through how to leverage the Flaventure tool suite to elevate every aspect of your blog.</p>
                            
                            <h3>1. Streamline Your Pre-Trip Planning and Content Strategy</h3>
                            <p>The best blog posts are born from well-planned trips. Before you even book a flight, our planning tools can help you lay the groundwork for incredible content.</p>
                            <ul>
                                <li><strong>Travel Budget Calculator:</strong> Start here to get a realistic view of your trip's finances. A clear budget allows you to plan which high-end restaurants or unique tours you can feature on your blog without breaking the bank. This transparency can also become content itself—readers love posts like "How to Spend 5 Days in Paris on a $500 Budget."</li>
                                <li><strong>Packing Checklist Generator:</strong> A well-packed bag means a stress-free trip. Use this tool to ensure you have all the necessary gear, from camera equipment to the right attire for a fancy dinner. This also serves as inspiration for practical posts like "My Essential Camera Gear for Food Photography" or "What to Pack for a Southeast Asian Culinary Tour."</li>
                                <li><strong>Best Time to Visit Finder:</strong> Great content often depends on great conditions. This tool helps you plan trips during seasons with the best weather, most interesting festivals, or fewer crowds, leading to better photos and more unique experiences to write about.</li>
                            </ul>

                            <h3>2. Create Higher-Quality, More Engaging Content</h3>
                            <p>Once your trip is planned, the focus shifts to content creation. Our blogger-focused tools are designed to help you create more compelling, useful, and professional articles and social media updates.</p>
                             <ul>
                                <li><strong>Content Ideas Generator:</strong> Writer's block is real. Use our AI tool to brainstorm headlines, article outlines, and unique angles. Input a destination like "Kyoto" and a theme like "matcha," and get ideas ranging from "A Tea Lover's Guide to Kyoto's Best Matcha Cafes" to "The Ancient Art of the Japanese Tea Ceremony."</li>
                                <li><strong>Food Photography Helper:</strong> Visuals are everything in food and travel blogging. This guide provides actionable tips on lighting, composition, and styling to make your photos look as delicious as the food tastes. Better photos lead to higher engagement and a more professional-looking blog.</li>
                                <li><strong>Local Food & Must-Try Dishes Finders:</strong> Authenticity is key. Use these tools to move beyond tourist traps and discover the dishes and eateries that locals love. Writing about a hidden gem you found using these tools will provide immense value to your readers and set your content apart.</li>
                            </ul>

                             <h3>3. Boost Your SEO and Drive More Traffic</h3>
                             <p>Creating great content is only half the battle; you need people to find it. Search Engine Optimization (SEO) is crucial, and our tools can demystify the process.</p>
                             <ul>
                                 <li><strong>Meta Tag Generator:</strong> This is one of the most important tools for SEO. A compelling title and description are what convince a user to click on your article in Google search results. Use this tool to craft perfect, length-appropriate tags that stand out.</li>
                                 <li><strong>Recipe Schema Generator:</strong> If you post recipes, this is non-negotiable. By adding schema markup, you're telling Google exactly what your content is. This is how you get those eye-catching "rich snippets" with photos, ratings, and cook times, dramatically increasing your click-through rate.</li>
                                 <li><strong>Content Ideas Generator for Keywords:</strong> Use the AI generator not just for ideas, but for keyword research. Ask it for "long-tail keywords related to solo female travel in Italy." It might suggest topics like "safest cities in Italy for solo female travelers" or "what to wear in Italy in spring," which are specific search terms people are actively looking for.</li>
                             </ul>

                             <h3>4. Engage Your Audience and Build a Community</h3>
                             <p>A blog is more than just articles; it's a community. Use our tools to foster engagement on and off your site.</p>
                              <ul>
                                 <li><strong>Hashtag & Caption Generator:</strong> Take the guesswork out of social media. Generate engaging captions for your Instagram photos and find relevant, high-traffic hashtags to expand your reach.</li>
                                 <li><strong>Share Your Itineraries:</strong> After using the Trip Planner and Budget Calculator, you can anonymize the data and share it as a downloadable resource for your readers. This kind of practical, helpful content builds loyalty and encourages readers to come back.</li>
                             </ul>
                             <p>By integrating these tools into your regular workflow, you can operate more efficiently, create higher-quality content, and grow your audience more effectively. Think of them as your personal assistant, researcher, and marketing expert, all rolled into one powerful, free suite.</p>
                        </CardContent>
                    </Card>
              </div>
            </div>
        </>
    );
}
