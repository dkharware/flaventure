
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';

export default async function AboutPage() {
  const pageTitle = "About easyfreecv";
  let content = null;
  try {
    content = await db.getAboutContent();
  } catch (error) {
    console.error("Failed to fetch about page content:", error);
  }

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline">{pageTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          {content ? (
            <>
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
              <p>{content.paragraph3}</p>
              <p>{content.paragraph4}</p>
            </>
          ) : (
            <p>The content for this page could not be loaded. Please ensure the site content has been seeded in the database.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
