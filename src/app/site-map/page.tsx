
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import sitemap from '../sitemap';

export default async function SitemapPage() {
  const routes = await sitemap();

  return (
    <div className="container mx-auto py-12 px-6 md:px-10">
      <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Sitemap</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc list-inside columns-2">
            {routes.map((route) => (
              <li key={route.url}>
                <Link href={route.url} className="text-primary hover:underline">
                  {new URL(route.url).pathname}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
