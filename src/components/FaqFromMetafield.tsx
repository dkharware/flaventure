
'use client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FaqFromMetafieldProps {
  htmlContent: string;
}

interface RichTextNode {
  type: string;
  children: { text: string }[];
}

const renderNode = (node: RichTextNode, index: number) => {
  const text = node.children.map(child => child.text).join('');
  switch (node.type) {
    case 'heading-three':
      return <h3 key={index} className="text-xl font-semibold mt-6 first:mt-0">{text}</h3>;
    case 'paragraph':
      return <p key={index} className="text-muted-foreground">{text}</p>;
    default:
      return <p key={index}>{text}</p>;
  }
};

export function FaqFromMetafield({ htmlContent }: FaqFromMetafieldProps) {
  if (!htmlContent) {
    return null;
  }

  let nodes: RichTextNode[] = [];
  try {
    const parsedContent = JSON.parse(htmlContent);
    if (parsedContent?.children && Array.isArray(parsedContent.children)) {
      nodes = parsedContent.children;
    }
  } catch (error) {
    console.error("Failed to parse FAQ metafield JSON:", error);
    // If it's not JSON, it might be plain HTML, so we try to render it directly.
    return (
        <Card className="bg-background/50 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline text-center">
                Frequently Asked Questions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </CardContent>
        </Card>
    );
  }

  if (nodes.length === 0) {
    return null;
  }

  return (
    <Card className="bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-headline text-center">
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
            {nodes.map(renderNode)}
        </div>
      </CardContent>
    </Card>
  );
}
