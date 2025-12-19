
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from './CopyButton';
import { Button } from '../ui/button';
import { Plus, Trash } from 'lucide-react';

export function RecipeSchemaGenerator() {
    const [formData, setFormData] = useState({
        name: 'Classic Margherita Pizza',
        author: 'Jane Doe',
        description: 'A delicious and simple Margherita pizza with fresh mozzarella, basil, and a rich tomato sauce.',
        prepTime: 'PT15M', // ISO 8601 duration format
        cookTime: 'PT20M',
        totalTime: 'PT35M',
        keywords: 'Pizza, Italian, Vegetarian',
        recipeYield: '4 servings',
        recipeCategory: 'Main Course',
        recipeCuisine: 'Italian',
        calories: '300',
        ingredients: ['1 lb pizza dough', '1/2 cup tomato sauce', '8 oz fresh mozzarella', 'Fresh basil leaves'],
        instructions: ['Preheat oven to 475°F (245°C).', 'Roll out dough and spread sauce.', 'Top with mozzarella and basil.', 'Bake for 10-12 minutes.'],
        imageUrl: 'https://picsum.photos/seed/pizza/800/600',
        ratingValue: '4.8',
        reviewCount: '125',
    });

    const [generatedSchema, setGeneratedSchema] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleListChange = (listName: 'ingredients' | 'instructions', index: number, value: string) => {
        const newList = [...formData[listName]];
        newList[index] = value;
        setFormData(prev => ({...prev, [listName]: newList}));
    };

    const addListItem = (listName: 'ingredients' | 'instructions') => {
        setFormData(prev => ({...prev, [listName]: [...prev[listName], '']}));
    };

    const removeListItem = (listName: 'ingredients' | 'instructions', index: number) => {
        const newList = formData[listName].filter((_, i) => i !== index);
        setFormData(prev => ({...prev, [listName]: newList}));
    };

    useEffect(() => {
        const schema = {
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "name": formData.name,
            "author": {
                "@type": "Person",
                "name": formData.author
            },
            "datePublished": new Date().toISOString().split('T')[0],
            "description": formData.description,
            "image": formData.imageUrl,
            "prepTime": formData.prepTime,
            "cookTime": formData.cookTime,
            "totalTime": formData.totalTime,
            "keywords": formData.keywords,
            "recipeYield": formData.recipeYield,
            "recipeCategory": formData.recipeCategory,
            "recipeCuisine": formData.recipeCuisine,
            "nutrition": {
                "@type": "NutritionInformation",
                "calories": `${formData.calories} calories`
            },
            "recipeIngredient": formData.ingredients.filter(i => i.trim() !== ''),
            "recipeInstructions": formData.instructions.filter(i => i.trim() !== '').map(instruction => ({
                "@type": "HowToStep",
                "text": instruction
            })),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": formData.ratingValue,
              "ratingCount": formData.reviewCount
            },
        };
        setGeneratedSchema(JSON.stringify(schema, null, 2));
    }, [formData]);

    return (
        <Card className="bg-background/50 backdrop-blur-lg">
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-4">
                        <CardHeader className="p-0 mb-4">
                           <CardTitle>Recipe Details</CardTitle>
                           <CardDescription>Fill in your recipe information to create the schema.</CardDescription>
                        </CardHeader>
                        
                        <div className="space-y-2">
                            <Label htmlFor="name">Recipe Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="author">Author Name</Label>
                                <Input id="author" name="author" value={formData.author} onChange={handleChange} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                            </div>
                        </div>

                         <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="prepTime">Prep Time (e.g., PT15M)</Label>
                                <Input id="prepTime" name="prepTime" value={formData.prepTime} onChange={handleChange} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="cookTime">Cook Time (e.g., PT20M)</Label>
                                <Input id="cookTime" name="cookTime" value={formData.cookTime} onChange={handleChange} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="totalTime">Total Time (e.g., PT35M)</Label>
                                <Input id="totalTime" name="totalTime" value={formData.totalTime} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ingredients">Ingredients</Label>
                            {formData.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input value={ingredient} onChange={(e) => handleListChange('ingredients', index, e.target.value)} placeholder={`Ingredient ${index + 1}`} />
                                    <Button variant="ghost" size="icon" onClick={() => removeListItem('ingredients', index)}>
                                        <Trash className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => addListItem('ingredients')}>
                                <Plus className="mr-2 h-4 w-4" /> Add Ingredient
                            </Button>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="instructions">Instructions</Label>
                            {formData.instructions.map((instruction, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Textarea value={instruction} onChange={(e) => handleListChange('instructions', index, e.target.value)} placeholder={`Step ${index + 1}`} rows={2} />
                                     <Button variant="ghost" size="icon" onClick={() => removeListItem('instructions', index)}>
                                        <Trash className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => addListItem('instructions')}>
                                <Plus className="mr-2 h-4 w-4" /> Add Step
                            </Button>
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
                    </div>
                    <div className="space-y-4">
                        <CardHeader className="p-0">
                            <CardTitle>Generated JSON-LD Schema</CardTitle>
                            <CardDescription>Copy this script and paste it before the closing {`</body>`} tag.</CardDescription>
                        </CardHeader>
                        <div className="relative">
                            <pre className="bg-muted text-foreground p-4 rounded-lg shadow-inner overflow-x-auto h-[75vh]">
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
