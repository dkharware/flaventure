
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CopyButton } from './CopyButton';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function ShopifyAiContentGenerator() {
    const [contentType, setContentType] = useState('productDescription');
    const [prompt, setPrompt] = useState('A durable, waterproof hiking boot made with sustainable materials. Features include a Vibram outsole for grip and a breathable Gore-Tex membrane.');
    const [tone, setTone] = useState('enthusiastic');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setResult('');

        // Mock AI response for demonstration
        setTimeout(() => {
            let mockResult = '';
            if (contentType === 'productDescription') {
                mockResult = `**Experience the Ultimate Adventure with Our Eco-Friendly Hiking Boots!**\n\nConquer any trail with confidence in our revolutionary hiking boots, engineered for the modern explorer. Crafted from premium, sustainable materials, these boots aren't just good for your feet—they're good for the planet.\n\n**Key Features:**\n- **Unbeatable Traction:** Featuring a rugged Vibram outsole, you'll get unparalleled grip on wet rocks, muddy paths, and everything in between.\n- **Stay Dry & Comfortable:** A breathable Gore-Tex membrane keeps water out while letting sweat escape, ensuring your feet stay dry and comfortable all day long.\n- **Built to Last:** Designed for durability, these boots are ready to tackle countless adventures with you.`;
            } else if (contentType === 'blogIdeas') {
                mockResult = `**Top 5 Hiking Trails to Explore This Fall**\n\nAs the leaves change, it's the perfect time to hit the trails. Here are our top 5 picks for the most scenic fall hikes that are perfect for our waterproof boots.\n\n1.  Appalachian Trail, Shenandoah National Park\n2.  The Narrows, Zion National Park\n3.  Grinnell Glacier, Glacier National Park\n4.  ...`;
            } else {
                 mockResult = `**New Gear Alert! 🚀**\nReady for your next adventure? Our new eco-friendly hiking boots have just dropped! 🏞️ Waterproof, durable, and ready for anything. Tap to shop now and explore with confidence! #Hiking #OutdoorGear #AdventureAwaits`;
            }
            setResult(mockResult);
            setIsLoading(false);
        }, 1500);
    };

    const getPromptPlaceholder = () => {
        switch (contentType) {
            case 'productDescription':
                return 'e.g., A lightweight, 15-inch laptop with a 4K display and 16GB RAM.';
            case 'blogIdeas':
                return 'e.g., Topics related to sustainable outdoor gear and hiking.';
            case 'socialMediaPost':
                return 'e.g., Announce the launch of a new collection of hiking backpacks.';
            default:
                return '';
        }
    }

    return (
        <Card className="bg-background/50 backdrop-blur-lg">
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="contentType">Content Type</Label>
                            <Select value={contentType} onValueChange={setContentType}>
                                <SelectTrigger id="contentType">
                                    <SelectValue placeholder="Select content type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="productDescription">Product Description</SelectItem>
                                    <SelectItem value="blogIdeas">Blog Post Ideas</SelectItem>
                                    <SelectItem value="socialMediaPost">Social Media Post</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="prompt">Prompt / Keywords</Label>
                            <Textarea
                                id="prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={getPromptPlaceholder()}
                                rows={5}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tone">Tone of Voice</Label>
                             <Select value={tone} onValueChange={setTone}>
                                <SelectTrigger id="tone">
                                    <SelectValue placeholder="Select a tone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                                    <SelectItem value="professional">Professional</SelectItem>
                                    <SelectItem value="playful">Playful</SelectItem>
                                    <SelectItem value="technical">Technical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                            <Sparkles className="mr-2 h-4 w-4" />
                            {isLoading ? 'Generating...' : 'Generate Content'}
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="result" className="text-lg font-semibold">Generated Content</Label>
                         <div className="relative">
                            {isLoading ? (
                                <div className="space-y-2 h-[260px] p-3 bg-muted rounded-md">
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ) : (
                                <div className="relative">
                                    <Textarea
                                        id="result"
                                        value={result}
                                        readOnly
                                        placeholder="AI-generated content will appear here..."
                                        rows={12}
                                        className="bg-muted font-mono text-sm"
                                    />
                                    {result && <CopyButton textToCopy={result} />}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
