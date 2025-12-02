
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const storefrontApiExamples = [
    {
        name: 'Get Product',
        query: `
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
}`.trim(),
        variables: `
{
  "handle": "the-full-stack-snowboard"
}`.trim(),
        response: `
{
  "data": {
    "product": {
      "id": "gid://shopify/Product/8226090418454",
      "title": "The Full-Stack Snowboard",
      "description": "This board is a testament to the...",
      "vendor": "storedevguide",
      "variants": { ... }
    }
  },
  "extensions": { ... }
}`.trim()
    },
    {
        name: 'Create Cart',
        query: `
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
                product {
                    title
                }
              }
            }
          }
        }
      }
    }
    userErrors {
        field
        message
    }
  }
}`.trim(),
        variables: `
{
  "input": {
    "lines": [
      {
        "quantity": 1,
        "merchandiseId": "gid://shopify/ProductVariant/44734870585622"
      }
    ],
    "attributes": [
      { "key": "cart_attribute", "value": "This is a cart attribute" }
    ]
  }
}`.trim(),
        response: `
{
  "data": {
    "cartCreate": {
      "cart": {
        "id": "gid://shopify/Cart/c1-123456...",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z",
        "lines": { ... }
      },
      "userErrors": []
    }
  },
  "extensions": { ... }
}`.trim()
    }
];

const adminApiExamples = [
    {
        name: 'Update Product',
        query: `
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
}`.trim(),
        variables: `
{
  "input": {
    "id": "gid://shopify/Product/8226090418454",
    "tags": ["New", "Sale"]
  }
}`.trim(),
        response: `
{
  "data": {
    "productUpdate": {
      "product": {
        "id": "gid://shopify/Product/8226090418454",
        "title": "The Full-Stack Snowboard",
        "tags": ["New", "Sale"]
      },
      "userErrors": []
    }
  }
}`.trim()
    },
     {
        name: 'Create Product',
        query: `
mutation productCreate($input: ProductInput!) {
  productCreate(input: $input) {
    product {
      id
      title
      handle
      status
    }
    userErrors {
      field
      message
    }
  }
}`.trim(),
        variables: `
{
  "input": {
    "title": "My New Awesome Product",
    "productType": "Snowboard",
    "vendor": "storedevguide",
    "status": "DRAFT"
  }
}`.trim(),
        response: `
{
  "data": {
    "productCreate": {
      "product": {
        "id": "gid://shopify/Product/9123456789012",
        "title": "My New Awesome Product",
        "handle": "my-new-awesome-product",
        "status": "DRAFT"
      },
      "userErrors": []
    }
  }
}`.trim()
    }
];


const CodeBlock = ({ code }: { code: string }) => (
    <pre className="text-xs bg-[#2d2d2d] p-4 rounded-md overflow-x-auto text-white h-full">
        <code>{code}</code>
    </pre>
);

const ApiTabContent = ({ example }: { example: { query: string, variables: string, response: string } }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col gap-4">
            <Card className="bg-[#2d2d2d] border-[#444] flex-grow">
                <CardHeader className="p-3 border-b border-[#444] flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-white">Operation</CardTitle>
                    <Button size="icon" className="h-8 w-8 bg-pink-600 hover:bg-pink-700">
                        <Play className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-60px)]">
                    <CodeBlock code={example.query} />
                </CardContent>
            </Card>
            <Card className="bg-[#2d2d2d] border-[#444] flex-grow">
                 <CardHeader className="p-3 border-b border-[#444]">
                    <CardTitle className="text-sm font-medium text-white">Variables</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-60px)]">
                    <CodeBlock code={example.variables} />
                </CardContent>
            </Card>
        </div>

        <Card className="bg-[#2d2d2d] border-[#444] h-full">
            <CardHeader className="p-3 border-b border-[#444]">
                <CardTitle className="text-sm font-medium text-white">Response</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
                <CodeBlock code={example.response} />
            </CardContent>
        </Card>
    </div>
);

const ApiExampleTabs = ({ examples }: { examples: any[] }) => {
    if (!examples || examples.length === 0) return null;

    return (
        <Tabs defaultValue={examples[0].name} className="w-full h-full flex flex-col">
            <TabsList className="mb-2 bg-transparent p-0 justify-start border-b border-b-[#444] rounded-none">
                {examples.map(ex => (
                    <TabsTrigger 
                        key={ex.name} 
                        value={ex.name}
                        className="data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white rounded-none border-b-2 border-b-transparent data-[state=active]:border-pink-600"
                    >
                        {ex.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {examples.map(ex => (
                <TabsContent key={ex.name} value={ex.name} className="flex-grow mt-4">
                   <ApiTabContent example={ex} />
                </TabsContent>
            ))}
        </Tabs>
    );
};

export const GraphiQLMock = () => {
    return (
        <Card className="bg-[#1e1e1e] p-4 border-[#444] min-h-[500px]">
            <Tabs defaultValue="storefront" className="w-full h-full flex flex-col">
                <TabsList className="mb-4 bg-[#2d2d2d] border border-[#444] w-full justify-start rounded-md">
                    <TabsTrigger value="storefront" className="data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white">Storefront API</TabsTrigger>
                    <TabsTrigger value="admin" className="data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white">Admin API</TabsTrigger>
                </TabsList>
                <TabsContent value="storefront" className="flex-grow">
                    <ApiExampleTabs examples={storefrontApiExamples} />
                </TabsContent>
                <TabsContent value="admin" className="flex-grow">
                    <ApiExampleTabs examples={adminApiExamples} />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
