
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from './CopyButton';

export function ProductSchemaGenerator() {
    const [formData, setFormData] = useState({
        name: 'Classic Crewneck T-Shirt',
        imageUrl: 'https://cdn.shopify.com/s/files/1/2/3/4/files/t-shirt.jpg',
        description: 'A timeless and comfortable crewneck t-shirt made from 100% premium cotton.',
        sku: 'TSHIRT-CLASSIC-BLK-M',
        brand: 'MyBrand',
        price: '25.00',
        currency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://my-store.com/products/classic-crewneck-t-shirt',
        ratingValue: '4.5',
        reviewCount: '150',
    });

    const [generatedSchema, setGeneratedSchema] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    useEffect(() => {
        const schema = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": formData.name,
            "image": [formData.imageUrl],
            "description": formData.description,
            "sku": formData.sku,
            "mpn": formData.sku, // Often the same as SKU
            "brand": {
              "@type": "Brand",
              "name": formData.brand
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": formData.ratingValue,
              "reviewCount": formData.reviewCount
            },
            "offers": {
              "@type": "Offer",
              "url": formData.url,
              "priceCurrency": formData.currency,
              "price": formData.price,
              "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // Valid for 1 year
              "itemCondition": "https://schema.org/NewCondition",
              "availability": formData.availability
            }
        };
        setGeneratedSchema(JSON.stringify(schema, null, 2));
    }, [formData]);

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <CardHeader className="p-0 mb-4">
                           <CardTitle>Product Details</CardTitle>
                           <CardDescription>Fill in your product information to create the schema.</CardDescription>
                        </CardHeader>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="sku">SKU / MPN</Label>
                                <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="url">Product URL</Label>
                            <Input id="url" name="url" value={formData.url} onChange={handleChange} />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" name="price" value={formData.price} onChange={handleChange} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="currency">Currency (e.g., USD)</Label>
                                <Input id="currency" name="currency" value={formData.currency} onChange={handleChange} />
                            </div>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="ratingValue">Average Rating</Label>
                                <Input id="ratingValue" name="ratingValue" value={formData.ratingValue} onChange={handleChange} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="reviewCount">Review Count</Label>
                                <Input id="reviewCount" name="reviewCount" value={formData.reviewCount} onChange={handleChange} />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="brand">Brand Name</Label>
                            <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <CardHeader className="p-0">
                            <CardTitle>Generated JSON-LD Schema</CardTitle>
                            <CardDescription>Copy this script and paste it before the closing {`</body>`} tag in your theme.</CardDescription>
                        </CardHeader>
                        <div className="relative">
                            <pre className="bg-muted text-foreground p-4 rounded-lg shadow-inner overflow-x-auto h-[500px]">
                                <code>
                                    {`<script type="application/ld+json">\n${generatedSchema}\n</script>`}
                                </code>
                            </pre>
                            <CopyButton textToCopy={`<script type="application/ld+json">\n${generatedSchema}\n</script>`} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
