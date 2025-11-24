
import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://easyfreecv.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/blog',
    '/privacy-policy',
    '/terms-and-conditions',
    '/site-map',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  // We won't pre-build blog post routes for the sitemap as they are dynamic from Shopify
  // but you could fetch them here if you wanted them in your sitemap.xml

  return [...staticRoutes];
}
