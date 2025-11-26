
import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/shopify';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopifydevguide.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/blog',
    '/privacy-policy',
    '/terms-and-conditions',
    '/site-map',
    '/shopify-liquid-cheatsheet'
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
