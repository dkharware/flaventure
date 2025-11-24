
import { MetadataRoute } from 'next';
import { templates } from './templates/page'; // Assuming templates are exported

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://easyfreecv.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/login',
    '/signup',
    '/templates',
    '/blog',
    '/privacy-policy',
    '/terms-and-conditions',
    '/site-map',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const templateRoutes = templates.map((template) => {
     const isCoverLetter = template.category === 'Cover Letter';
     const editorPath = isCoverLetter ? 'cover-letter-editor' : 'editor';

    return {
        url: `${siteUrl}/${editorPath}/${template.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    } as const;
  });

  // We won't pre-build blog post routes for the sitemap as they are dynamic from Shopify
  // but you could fetch them here if you wanted them in your sitemap.xml

  return [...staticRoutes, ...templateRoutes];
}
