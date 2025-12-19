
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FaqFromMetafieldProps {
  htmlContent: string;
}

export function FaqFromMetafield({ htmlContent }: FaqFromMetafieldProps) {
  if (!htmlContent) {
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
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </CardContent>
    </Card>
  );
}
