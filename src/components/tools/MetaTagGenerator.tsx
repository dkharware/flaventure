'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from './CopyButton';

export function MetaTagGenerator() {
    const [formData, setFormData] = useState({
        title: 'My Awesome Product',
        description: 'This is a description of my awesome product. It is the best product ever.',
        url: 'https://my-store.myshopify.com/products/my-awesome-product',
        imageUrl: 'https://cdn.shopify.com/s/files/1/2/3/4/files/my-product-image.jpg',
        siteName: 'My Awesome Store',
    });

    const [generatedTags, setGeneratedTags] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    useEffect(() => {
        const { title, description, url, imageUrl, siteName } = formData;
        const tags = `
<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:site_name" content="${siteName}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">
`;
        setGeneratedTags(tags.trim());
    }, [formData]);

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <CardHeader className="p-0">
                           <CardTitle>Content Details</CardTitle>
                           <CardDescription>Enter the details for your page, product, or article.</CardDescription>
                        </CardHeader>
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., The Best T-Shirt Ever" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="A short, compelling description..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="url">Full URL</Label>
                            <Input id="url" name="url" value={formData.url} onChange={handleChange} placeholder="https://your-store.com/products/handle" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://cdn.shopify.com/.../image.jpg" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="siteName">Site Name</Label>
                            <Input id="siteName" name="siteName" value={formData.siteName} onChange={handleChange} placeholder="My Awesome Store" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <CardHeader className="p-0">
                            <CardTitle>Generated Meta Tags</CardTitle>
                            <CardDescription>Copy and paste this into the `<head>` of your theme.</CardDescription>
                        </CardHeader>
                        <div className="relative">
                            <pre className="bg-muted text-foreground p-4 rounded-lg shadow-inner overflow-x-auto h-[350px]">
                                <code>{generatedTags}</code>
                            </pre>
                            {generatedTags && <CopyButton textToCopy={generatedTags} />}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
