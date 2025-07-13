import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFeatureFlag } from '@/lib/flags';
import { db } from '@/lib/db';

const useNewAboutPageTitle = createFeatureFlag("new_about_page_title", false);

export default async function AboutPage() {
  const newTitleEnabled = await useNewAboutPageTitle();
  const pageTitle = newTitleEnabled ? "About ResumeFlow" : "About ResumeFlow";
  const content = await db.getAboutContent();

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline">{pageTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>{content.paragraph1}</p>
          <p>{content.paragraph2}</p>
          <p>{content.paragraph3}</p>
          <p>{content.paragraph4}</p>
        </CardContent>
      </Card>
    </div>
  );
}
