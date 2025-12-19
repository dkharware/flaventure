
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RecipeSchemaGenerator } from '@/components/tools/RecipeSchemaGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Free Recipe Schema Generator (JSON-LD) | Flaventure Tools',
    description: 'Easily create JSON-LD schema markup for your recipes. Enhance your search engine listings with rich snippets, including ratings, cook time, and nutrition.',
    keywords: ['recipe schema', 'JSON-LD generator', 'structured data', 'food blog SEO', 'rich snippets', 'Google search results'],
};

export default function RecipeSchemaGeneratorPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Tools' },
        { label: 'Recipe Schema Generator' },
    ];

  return (
    <>
      <div className="w-full bg-background/50 backdrop-blur-lg border-b py-8">
        <div className="container mx-auto px-4 md:px-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Recipe Schema Generator</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Generate JSON-LD schema markup for your recipes to get rich snippets and improve your food blog's SEO.
                </p>
            </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
          <div className="max-w-5xl mx-auto">
              <RecipeSchemaGenerator />
          </div>

          <div className="prose dark:prose-invert max-w-4xl mx-auto mt-12">
              <Card className="mt-8 bg-background/50 backdrop-blur-lg">
                  <CardHeader>
                      <CardTitle>What is Recipe Schema and Why Does it Matter?</CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                      <p><strong>Recipe schema</strong> is a form of structured data (specifically JSON-LD) that you add to your website to help search engines like Google understand that your content is a recipe. This is crucial for any food blog.</p>
                      <p>When you provide this data, Google can display your recipe as a "rich snippet" in search results. These are the eye-catching listings that include extra information like:</p>
                      <ul>
                          <li>A photo of the dish</li>
                          <li>Star ratings and review counts</li>
                          <li>Preparation and cook time</li>
                          <li>Calorie information</li>
                      </ul>
                      <h3>The Benefits of Using Recipe Schema</h3>
                      <ol>
                          <li><strong>Increased Visibility:</strong> Rich snippets are visually appealing and take up more space in search results, making your recipes stand out.</li>
                          <li><strong>Higher Click-Through Rate (CTR):</strong> By providing key information upfront, you attract more interested home cooks who are ready to try your recipe.</li>
                          <li><strong>Voice Search Optimization:</strong> Smart speakers like Google Home and Amazon Echo use structured data to provide step-by-step cooking instructions for voice queries.</li>
                          <li><strong>Inclusion in Recipe Carousels:</strong> Properly structured recipes are more likely to be featured in Google's recipe carousels, driving significant traffic.</li>
                      </ol>
                      <p>Use this tool to easily generate the required JSON-LD code. Simply fill in your recipe details, and then copy the generated script into your website's HTML.</p>
                  </CardContent>
              </Card>
          </div>
      </div>
    </>
  );
}
