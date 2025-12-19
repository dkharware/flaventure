
import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/shopify';
import { getSiteUrl } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticRoutes = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/site-map',
    '/terms-and-conditions',
    '/tools',
    '/tools/travel-budget-calculator',
    '/tools/packing-checklist-generator',
    '/tools/food-photography-helper',
    '/tools/meta-tag-generator',
    '/tools/recipe-schema-generator',
    '/tools/shopify-ai-content-generator',
    '/tools/trip-planner-tool',
    '/tools/best-time-to-visit-finder',
    '/tools/visa-requirement-checker',
    '/tools/currency-converter',
    '/tools/weather-forecast-tool',
    '/tools/route-distance-finder',
    '/tools/hotel-price-comparison-tool',
    '/tools/flight-deals-finder',
    '/tools/local-food-finder',
    '/tools/must-try-dishes-finder',
    '/tools/restaurant-price-guide',
    '/tools/veg-vegan-non-veg-filter',
    '/tools/food-allergy-checker',
    '/tools/spice-level-guide',
    '/tools/hashtag-caption-generator',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const { articles } = await getArticles(250);

  const blogRoutes = articles.map((article: any) => ({
    url: `${siteUrl}/blog/${article.handle}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.9,
  }));


  return [...staticRoutes, ...blogRoutes];
}
