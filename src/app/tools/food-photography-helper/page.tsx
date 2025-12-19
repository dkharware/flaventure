
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Lightbulb, Zap, LayoutGrid } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Food Photography Helper | Flaventure Tools',
    description: 'A simple guide with tips and best practices for taking better food photos for your blog or social media. Learn about lighting, composition, and styling.',
    keywords: ['food photography', 'photography tips', 'food blogger tools', 'photo guide'],
};

const tips = [
    {
        icon: <Lightbulb className="h-6 w-6" />,
        title: "Use Natural Light",
        description: "Natural light is your best friend. Position your dish near a window and turn off all artificial lights to avoid mixed lighting and unnatural color casts. A cloudy day provides perfect, soft, diffused light."
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Avoid the On-Camera Flash",
        description: "The direct, harsh light from your camera or phone's flash will create unappealing reflections and hard shadows. If you need more light, use a reflector (like a white piece of foam board) to bounce natural light back onto your subject."
    },
    {
        icon: <LayoutGrid className="h-6 w-6" />,
        title: "Master Composition",
        description: "Use the rule of thirds by placing your main subject off-center. Experiment with different angles—shoot from above (flat lay), from the side (straight on), or from a 45-degree angle to see what best showcases the dish."
    },
    {
        icon: <Camera className="h-6 w-6" />,
        title: "Tell a Story with Props",
        description: "Use props like cutlery, napkins, fresh ingredients, or a drink to create a scene and add context. Keep it simple and make sure the props complement the dish, rather than distracting from it."
    }
];

export default function FoodPhotographyHelperPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Food Photography Helper' },
    ];

    return (
    <>
        <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
            <div className="container mx-auto px-4 md:px-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="text-center my-8">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Food Photography Helper</h1>
                    <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                       Simple tips and tricks to make your food photos look delicious.
                    </p>
                </div>
            </div>
        </div>
        <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
            <div className="max-w-4xl mx-auto">
                 <Card className="bg-background/50 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle>Core Principles of Great Food Photography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {tips.map(tip => (
                                <div key={tip.title} className="flex gap-4">
                                    <div className="text-primary flex-shrink-0">{tip.icon}</div>
                                    <div>
                                        <h3 className="font-semibold">{tip.title}</h3>
                                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                                    </div>
                                </div>
                           ))}
                        </div>
                        <div className="pt-6 border-t">
                            <h3 className="font-semibold mb-4 text-center">Visual Example: Good vs. Bad Lighting</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-center font-medium mb-2">👍 Good (Side-lit by a window)</p>
                                    <Image src="https://picsum.photos/seed/good-food-photo/600/400" alt="Well-lit food photo" width={600} height={400} className="rounded-lg" data-ai-hint="delicious food" />
                                </div>
                                <div>
                                    <p className="text-sm text-center font-medium mb-2">👎 Bad (On-camera flash)</p>
                                    <Image src="https://picsum.photos/seed/bad-food-photo/600/400" alt="Poorly-lit food photo" width={600} height={400} className="rounded-lg" data-ai-hint="bad food" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
    );
}
