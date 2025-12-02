
'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { CopyButton } from './CopyButton';

export function LiquidToJsonConverter() {
    const [liquidInput, setLiquidInput] = useState<string>('{%- assign product_json = product | json -%}\n<script type="application/json" id="ProductJson-{{ product.id }}">\n    {{ product_json }}\n</script>');
    const [jsonOutput, setJsonOutput] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleConvert = useCallback(() => {
        setError('');
        setJsonOutput('');

        if (!liquidInput.trim()) {
            setError('Input cannot be empty.');
            return;
        }

        try {
            // This is a simplified approach. It looks for a JSON block inside <script> tags.
            const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
            const match = liquidInput.match(scriptRegex);
            
            if (match && match[1]) {
                const jsonString = match[1].trim()
                    // Attempt to clean up Liquid syntax remnants
                    .replace(/{{\s*product_json\s*}}/g, '') 
                    .trim();

                try {
                    const jsonObj = JSON.parse(jsonString);
                    setJsonOutput(JSON.stringify(jsonObj, null, 2));
                } catch (e) {
                     // Try to find JSON within the string
                    const jsonMatch = jsonString.match(/({[\s\S]*})/);
                    if (jsonMatch && jsonMatch[1]) {
                        const jsonObj = JSON.parse(jsonMatch[1]);
                        setJsonOutput(JSON.stringify(jsonObj, null, 2));
                    } else {
                        throw e; // Re-throw if no JSON is found
                    }
                }
            } else {
                setError("Could not automatically find a JSON block. This tool works best with Liquid that serializes an object to JSON, for example, inside a `<script>` tag like `{{ product | json }}`.");
            }
        } catch (e) {
            setError('Invalid JSON found. Please ensure the Liquid output is valid JSON.');
        }
    }, [liquidInput]);

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label htmlFor="liquid-input" className="text-lg font-semibold">Liquid Input</Label>
                        <Textarea
                            id="liquid-input"
                            value={liquidInput}
                            onChange={(e) => setLiquidInput(e.target.value)}
                            placeholder="Paste your Liquid code here..."
                            rows={12}
                            className="font-mono text-sm"
                        />
                        <Button onClick={handleConvert}>Convert to JSON</Button>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="json-output" className="text-lg font-semibold">JSON Output</Label>
                        <div className="relative">
                            <Textarea
                                id="json-output"
                                value={jsonOutput}
                                readOnly
                                placeholder="JSON output will appear here..."
                                rows={12}
                                className="bg-muted font-mono text-sm"
                            />
                            {jsonOutput && <CopyButton textToCopy={jsonOutput} />}
                        </div>
                        {error && (
                             <Alert variant="destructive">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Conversion Error</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>
                 <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>How does this work?</CardTitle>
                        <CardDescription>
                            This tool is designed for a common Shopify development pattern: serializing a Liquid object into a JSON object within a {'<script>'} tag to pass data to JavaScript.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            It works best when you provide a Liquid snippet that contains a JSON object. For example, pasting the content of a `product.json.liquid` template or a section that renders product data into a script tag.
                        </p>
                        <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto mt-4">
                            <code>
{`<!-- Example: -->
<script type="application/json">
    {{ product | json }}
</script>`}
                            </code>
                        </pre>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
