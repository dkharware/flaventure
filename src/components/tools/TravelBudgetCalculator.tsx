
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Plane, Hotel, UtensilsCrossed, Ticket, Users } from 'lucide-react';

interface BudgetItem {
    id: number;
    name: string;
    cost: number;
}

interface BudgetCategory {
    name: keyof typeof categoryIcons;
    items: BudgetItem[];
}

const categoryIcons = {
    'Flights': <Plane className="h-5 w-5" />,
    'Accommodation': <Hotel className="h-5 w-5" />,
    'Food': <UtensilsCrossed className="h-5 w-5" />,
    'Activities': <Ticket className="h-5 w-5" />,
};

const initialBudgetData: BudgetCategory[] = [
    { name: 'Flights', items: [{ id: 1, name: 'Round-trip to Tokyo', cost: 1200 }] },
    { name: 'Accommodation', items: [{ id: 1, name: 'Hotel for 7 nights', cost: 1400 }] },
    { name: 'Food', items: [{ id: 1, name: 'Daily food budget', cost: 560 }] },
    { name: 'Activities', items: [{ id: 1, name: 'Museums and tours', cost: 300 }] },
];

export function TravelBudgetCalculator() {
    const [budget, setBudget] = useState<BudgetCategory[]>(initialBudgetData);
    const [tripDays, setTripDays] = useState(7);
    const [numTravelers, setNumTravelers] = useState(1);

    const handleItemChange = (categoryIndex: number, itemIndex: number, field: 'name' | 'cost', value: string) => {
        const newBudget = [...budget];
        const items = [...newBudget[categoryIndex].items];
        items[itemIndex] = { ...items[itemIndex], [field]: field === 'cost' ? parseFloat(value) || 0 : value };
        newBudget[categoryIndex].items = items;
        setBudget(newBudget);
    };

    const addItem = (categoryIndex: number) => {
        const newBudget = [...budget];
        newBudget[categoryIndex].items.push({ id: Date.now(), name: '', cost: 0 });
        setBudget(newBudget);
    };

    const removeItem = (categoryIndex: number, itemId: number) => {
        const newBudget = [...budget];
        newBudget[categoryIndex].items = newBudget[categoryIndex].items.filter(item => item.id !== itemId);
        setBudget(newBudget);
    };

    const totalCost = useMemo(() => {
        return budget.reduce((total, category) => {
            return total + category.items.reduce((catTotal, item) => catTotal + item.cost, 0);
        }, 0);
    }, [budget]);

    const costPerPerson = useMemo(() => {
        return totalCost / (numTravelers || 1);
    }, [totalCost, numTravelers]);

    const costPerDay = useMemo(() => {
        return totalCost / (tripDays || 1);
    }, [totalCost, tripDays]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Card className="lg:col-span-2 bg-background/50 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle>Build Your Trip Budget</CardTitle>
                    <CardDescription>Add items to each category to calculate your total trip cost.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="trip-days">Number of Days</Label>
                            <Input id="trip-days" type="number" value={tripDays} onChange={(e) => setTripDays(parseInt(e.target.value) || 1)} min="1" />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="num-travelers">Number of Travelers</Label>
                            <Input id="num-travelers" type="number" value={numTravelers} onChange={(e) => setNumTravelers(parseInt(e.target.value) || 1)} min="1" />
                        </div>
                    </div>
                    {budget.map((category, catIndex) => (
                        <div key={category.name}>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                {categoryIcons[category.name]}
                                {category.name}
                            </h3>
                            <div className="space-y-2">
                                {category.items.map((item, itemIndex) => (
                                    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[2fr,1fr,auto] gap-2 items-center">
                                        <Input
                                            placeholder="Item name"
                                            value={item.name}
                                            onChange={(e) => handleItemChange(catIndex, itemIndex, 'name', e.target.value)}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Cost"
                                            value={item.cost || ''}
                                            onChange={(e) => handleItemChange(catIndex, itemIndex, 'cost', e.target.value)}
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => removeItem(catIndex, item.id)}>
                                            <Trash className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" className="mt-2" onClick={() => addItem(catIndex)}>
                                <Plus className="h-4 w-4 mr-2" /> Add Item
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="lg:sticky lg:top-28 space-y-6">
                <Card className="bg-background/50 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle>Total Estimated Cost</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-primary">{formatCurrency(totalCost)}</p>
                    </CardContent>
                </Card>
                 <Card className="bg-background/50 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle>Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-muted-foreground">
                        <div className="flex justify-between items-center">
                            <span>Cost per person</span>
                            <span className="font-semibold text-foreground">{formatCurrency(costPerPerson)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Cost per day</span>
                            <span className="font-semibold text-foreground">{formatCurrency(costPerDay)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
