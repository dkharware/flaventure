
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const storefrontQuery = `
query getProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    vendor
    variants(first: 10) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
`.trim();

const storefrontVariables = `
{
  "handle": "the-full-stack-snowboard"
}
`.trim();

const storefrontResponse = `
{
  "data": {
    "product": {
      "id": "gid://shopify/Product/8226090418454",
      "title": "The Full-Stack Snowboard",
      "description": "This board is a testament to the...",
      "vendor": "storedevguide",
      "variants": {
        "edges": [
          {
            "node": {
              "id": "gid://shopify/ProductVariant/44734870585622",
              "title": "154cm",
              "price": {
                "amount": "749.95",
                "currencyCode": "USD"
              }
            }
          }
        ]
      }
    }
  },
  "extensions": { ... }
}
`.trim();

const adminApiQuery = `
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      id
      title
      tags
    }
    userErrors {
      field
      message
    }
  }
}
`.trim();

const adminApiVariables = `
{
  "input": {
    "id": "gid://shopify/Product/8226090418454",
    "tags": ["New", "Sale"]
  }
}
`.trim();

const adminApiResponse = `
{
  "data": {
    "productUpdate": {
      "product": {
        "id": "gid://shopify/Product/8226090418454",
        "title": "The Full-Stack Snowboard",
        "tags": [
          "New",
          "Sale"
        ]
      },
      "userErrors": []
    }
  }
}
`.trim();

const CodeBlock = ({ code }: { code: string }) => (
    <pre className="text-xs bg-[#2d2d2d] p-4 rounded-md overflow-x-auto text-white h-full">
        <code>{code}</code>
    </pre>
);

export const GraphiQLMock = () => {

    const ApiTab = ({ title, query, variables, response }: { title: string, query: string, variables: string, response: string }) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <div className="flex flex-col gap-4">
                <Card className="bg-[#2d2d2d] border-[#444] flex-grow">
                    <CardHeader className="p-3 border-b border-[#444] flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium text-white">{title} Query</CardTitle>
                        <Button size="icon" className="h-8 w-8 bg-pink-600 hover:bg-pink-700">
                            <Play className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 h-[calc(100%-60px)]">
                        <CodeBlock code={query} />
                    </CardContent>
                </Card>
                <Card className="bg-[#2d2d2d] border-[#444] flex-grow">
                     <CardHeader className="p-3 border-b border-[#444]">
                        <CardTitle className="text-sm font-medium text-white">Variables</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 h-[calc(100%-60px)]">
                        <CodeBlock code={variables} />
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#2d2d2d] border-[#444] h-full">
                <CardHeader className="p-3 border-b border-[#444]">
                    <CardTitle className="text-sm font-medium text-white">Response</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-60px)]">
                    <CodeBlock code={response} />
                </CardContent>
            </Card>
        </div>
    );

    return (
        <Card className="bg-[#1e1e1e] p-4 border-[#444] min-h-[500px]">
            <Tabs defaultValue="storefront" className="w-full h-full flex flex-col">
                <TabsList className="mb-4 bg-[#2d2d2d] border border-[#444]">
                    <TabsTrigger value="storefront" className="data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white">Storefront API</TabsTrigger>
                    <TabsTrigger value="admin" className="data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white">Admin API</TabsTrigger>
                </TabsList>
                <TabsContent value="storefront" className="flex-grow">
                    <ApiTab title="Storefront" query={storefrontQuery} variables={storefrontVariables} response={storefrontResponse} />
                </TabsContent>
                <TabsContent value="admin" className="flex-grow">
                    <ApiTab title="Admin" query={adminApiQuery} variables={adminApiVariables} response={adminApiResponse} />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
