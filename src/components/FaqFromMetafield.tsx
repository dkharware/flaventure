
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface FaqFromMetafieldProps {
  htmlContent: string;
}

interface TextNode {
  type: 'text';
  value: string;
  bold?: boolean;
}

interface ElementNode {
  type: 'heading' | 'paragraph';
  level?: number;
  children: TextNode[];
}

interface RootNode {
  type: 'root';
  children: ElementNode[];
}

const renderNode = (node: TextNode, index: number) => {
  if (node.bold) {
    return <strong key={index}>{node.value}</strong>;
  }
  return <React.Fragment key={index}>{node.value}</React.Fragment>;
};

const groupFaqs = (nodes: ElementNode[]) => {
    const faqs: { question: ElementNode; answer: ElementNode }[] = [];
    let currentQuestion: ElementNode | null = null;
  
    nodes.forEach(node => {
      if (node.type === 'heading' && node.level === 3) {
        if (currentQuestion) {
           // This case handles multiple headings in a row, we push the previous one with an empty answer
            faqs.push({ question: currentQuestion, answer: { type: 'paragraph', children: [] } });
        }
        currentQuestion = node;
      } else if (node.type === 'paragraph' && currentQuestion) {
        faqs.push({ question: currentQuestion, answer: node });
        currentQuestion = null;
      }
    });

    if (currentQuestion) {
        faqs.push({ question: currentQuestion, answer: { type: 'paragraph', children: [] } });
    }
  
    return faqs;
};


export function FaqFromMetafield({ htmlContent }: FaqFromMetafieldProps) {
  if (!htmlContent) {
    return null;
  }

  let parsedContent: RootNode;
  try {
    parsedContent = JSON.parse(htmlContent);
    if (parsedContent.type !== 'root' || !Array.isArray(parsedContent.children)) {
        throw new Error("Invalid FAQ JSON structure");
    }
  } catch (error) {
    console.error("Failed to parse FAQ JSON:", error);
    // If it's not valid JSON, render it as plain text as a fallback
    return (
        <Card className="bg-background/50 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose dark:prose-invert max-w-none">{htmlContent}</div>
            </CardContent>
        </Card>
    );
  }
  
  const faqPairs = groupFaqs(parsedContent.children);
  const mainTitleNode = parsedContent.children.find(c => c.type === 'heading' && c.level === 2);
  const mainTitle = mainTitleNode ? mainTitleNode.children.map(renderNode) : 'Frequently Asked Questions';


  return (
    <Card className="bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-headline text-center">
            {mainTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
            {faqPairs.map((faq, index) => (
                <AccordionItem value={`faq-${index}`} key={index}>
                    <AccordionTrigger>
                        {faq.question.children.map(renderNode)}
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert max-w-none">
                        <p>{faq.answer.children.map(renderNode)}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
