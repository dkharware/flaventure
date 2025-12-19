
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '../ui/input';
import { Printer } from 'lucide-react';

interface ChecklistItem {
    id: string;
    label: string;
    checked: boolean;
}

const packingData = {
    essentials: [
        { id: 'passport', label: 'Passport / ID' },
        { id: 'tickets', label: 'Tickets / Boarding Passes' },
        { id: 'wallet', label: 'Wallet (Cash & Cards)' },
        { id: 'phone', label: 'Phone & Charger' },
        { id: 'meds', label: 'Personal Medications' },
    ],
    clothing: {
        all: [
            { id: 'underwear', label: 'Underwear' },
            { id: 'socks', label: 'Socks' },
            { id: 'pajamas', label: 'Pajamas' },
        ],
        beach: [
            { id: 'swimsuit', label: 'Swimsuit' },
            { id: 'shorts', label: 'Shorts' },
            { id: 't-shirts', label: 'T-Shirts' },
            { id: 'sandals', label: 'Sandals / Flip-flops' },
            { id: 'sun-hat', label: 'Sun Hat' },
        ],
        city: [
            { id: 'jeans', label: 'Jeans / Trousers' },
            { id: 'shirts', label: 'Shirts / Blouses' },
            { id: 'light-jacket', label: 'Light Jacket' },
            { id: 'walking-shoes', label: 'Comfortable Walking Shoes' },
        ],
        mountains: [
            { id: 'hiking-boots', label: 'Hiking Boots' },
            { id: 'thermal-layers', label: 'Thermal Layers' },
            { id: 'fleece-jacket', label: 'Fleece Jacket' },
            { id: 'waterproof-jacket', label: 'Waterproof Jacket' },
            { id: 'wool-socks', label: 'Wool Socks' },
        ],
    },
    toiletries: [
        { id: 'toothbrush', label: 'Toothbrush & Toothpaste' },
        { id: 'deodorant', label: 'Deodorant' },
        { id: 'shampoo', label: 'Shampoo & Conditioner' },
        { id: 'sunscreen', label: 'Sunscreen' },
        { id: 'bug-spray', label: 'Insect Repellent' },
    ],
    extras: {
        all: [
            { id: 'power-bank', label: 'Power Bank' },
            { id: 'adapter', label: 'Travel Adapter' },
            { id: 'book', label: 'Book / E-reader' },
        ],
        beach: [{ id: 'beach-towel', label: 'Beach Towel' }],
        city: [{ id: 'day-bag', label: 'Day Bag / Backpack' }],
        mountains: [{ id: 'hiking-poles', label: 'Hiking Poles' }],
    }
};

export function PackingChecklistGenerator() {
    const [destination, setDestination] = useState('city');
    const [customItems, setCustomItems] = useState<ChecklistItem[]>([]);
    const [customInput, setCustomInput] = useState('');
    const [checklist, setChecklist] = useState<{ [key: string]: ChecklistItem[] }>({});

    const generatedList = useMemo(() => {
        const list = {
            Essentials: packingData.essentials.map(i => ({...i, checked: false })),
            Clothing: [
                ...packingData.clothing.all,
                ...(packingData.clothing[destination as keyof typeof packingData.clothing] || [])
            ].map(i => ({...i, checked: false })),
            Toiletries: packingData.toiletries.map(i => ({...i, checked: false })),
            Extras: [
                 ...packingData.extras.all,
                ...(packingData.extras[destination as keyof typeof packingData.extras] || [])
            ].map(i => ({...i, checked: false })),
            Custom: customItems
        };
        setChecklist(list);
        return list;
    }, [destination, customItems]);

    const handleCheck = (category: string, id: string) => {
        const newChecklist = { ...checklist };
        const item = newChecklist[category].find(i => i.id === id);
        if (item) {
            item.checked = !item.checked;
            setChecklist(newChecklist);
        }
    };
    
    const addCustomItem = () => {
        if (customInput.trim()) {
            setCustomItems([...customItems, { id: `custom-${Date.now()}`, label: customInput.trim(), checked: false }]);
            setCustomInput('');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-8 print:space-y-4">
            <Card className="bg-background/50 backdrop-blur-lg print:hidden">
                <CardHeader>
                    <CardTitle>Generator Options</CardTitle>
                    <CardDescription>Select your destination type to generate a packing list.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Destination Type</Label>
                        <Select value={destination} onValueChange={setDestination}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select destination type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beach">Beach Holiday</SelectItem>
                                <SelectItem value="city">City Break</SelectItem>
                                <SelectItem value="mountains">Mountain Adventure</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-lg print:shadow-none print:border-none print:bg-transparent">
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Your Packing Checklist</CardTitle>
                        <CardDescription>Check off items as you pack them.</CardDescription>
                    </div>
                    <Button variant="outline" onClick={handlePrint} className="print:hidden"><Printer className="mr-2 h-4 w-4"/> Print List</Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Object.entries(generatedList).map(([category, items]) => (
                        items.length > 0 && (
                            <div key={category}>
                                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {items.map(item => (
                                        <div key={item.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={item.id}
                                                checked={item.checked}
                                                onCheckedChange={() => handleCheck(category, item.id)}
                                            />
                                            <label
                                                htmlFor={item.id}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {item.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                    <div className="pt-4 border-t print:hidden">
                        <Label htmlFor='custom-input' className='font-semibold'>Add a custom item</Label>
                        <div className="flex gap-2 mt-2">
                            <Input 
                                id="custom-input"
                                value={customInput} 
                                onChange={(e) => setCustomInput(e.target.value)}
                                placeholder="e.g., My favorite book"
                            />
                            <Button onClick={addCustomItem}>Add</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
