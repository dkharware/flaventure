
import { getArticles } from '@/lib/shopify';
import { getSiteUrl } from '@/lib/utils';

async function generateSitemapXml() {
    const siteUrl = getSiteUrl();

    const staticRoutes = [
        '/',
        '/about',
        '/contact',
        '/blog',
        '/privacy-policy',
        '/terms-and-conditions',
        '/site-map',
        '/shopify-liquid-cheatsheet',
        '/tutorials/shopify-api-guide',
        '/tools/meta-tag-generator',
        '/tools/liquid-to-json-converter',
        '/tools/product-schema-generator',
        '/tools/shopify-ai-content-generator',
        '/shopify-templates-boilerplates',
        '/nextjs-shopify-starter-template',
        '/shopify-theme-starter-template',
        '/shopify-liquid-snippets-pack',
        '/shopify-hydrogen-starter',
        '/shopify-tailwind-theme-template'
      ];
    
      const { articles } = await getArticles(250);

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map(route => `
    <url>
      <loc>${siteUrl}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
  ${articles.map((article: any) => `
    <url>
      <loc>${siteUrl}/blog/${article.handle}</loc>
      <lastmod>${new Date(article.publishedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `).join('')}
</urlset>`;

    return sitemap;
}

export async function GET() {
    const sitemap = await generateSitemapXml();
    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
