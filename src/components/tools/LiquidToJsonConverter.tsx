
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
            // This is a simplified approach. It looks for a JSON block inside <script> tags or as a raw object.
            const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
            let contentToParse = liquidInput;
            const scriptMatch = liquidInput.match(scriptRegex);
            
            if (scriptMatch && scriptMatch[1]) {
                contentToParse = scriptMatch[1];
            }

            // Clean up common Liquid remnants and find the JSON
            contentToParse = contentToParse.replace(/{{\s*.*?\s*}}/g, '').trim();
            const jsonMatch = contentToParse.match(/({[\s\S]*})|(\[[\s\S]*\])/);

            if (jsonMatch) {
                const jsonString = jsonMatch[0];
                const jsonObj = JSON.parse(jsonString);
                setJsonOutput(JSON.stringify(jsonObj, null, 2));
            } else {
                setError("Could not automatically find a JSON block. This tool works best with Liquid that serializes an object to JSON, for example, `{{ product | json }}`.");
            }
        } catch (e) {
            setError('Invalid JSON found. Please ensure the Liquid output contains a valid JSON object or array.');
        }
    }, [liquidInput]);

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label htmlFor="liquid-input" className="text-lg font-semibold">Liquid Output or Snippet</Label>
                        <Textarea
                            id="liquid-input"
                            value={liquidInput}
                            onChange={(e) => setLiquidInput(e.target.value)}
                            placeholder="Paste your Liquid code or rendered output here..."
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
            </CardContent>
        </Card>
    );
}
