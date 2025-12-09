
import { getArticleByHandle, getRelatedArticles, getArticles } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { Suspense, lazy } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArticleContent } from '@/components/ArticleContent';
import { Button } from '@/components/ui/button';
import { Eye, Download, User } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TableOfContents } from '@/components/TableOfContents';
import { ShareButtons } from '@/components/ShareButtons';
import { LikeButton } from '@/components/LikeButton';
import { Skeleton } from '@/components/ui/skeleton';
import Script from 'next/script';
import { getSiteUrl } from '@/lib/utils';
import { NextPageProps } from '@/app/types';

const CommentSection = lazy(() => import('@/components/CommentSection'));
const RelatedArticles = lazy(() => import('@/components/RelatedArticles'));

export default async function ArticlePage({ params }: NextPageProps<{ handle: string }>) {
  const resolvedParams = await params;
  const article = await getArticleByHandle(resolvedParams.handle);

  if (!article) {
    notFound();
  }
  
  const relatedArticles = await getRelatedArticles(article.handle, article.tags);
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: article.title },
  ];
  
  const pdfUrl = article.pdf?.value;
  const siteUrl = getSiteUrl();
  const fullUrl = `${siteUrl}/blog/${article.handle}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "headline": article.title,
    "image": article.image ? [article.image.url] : [],
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.authorV2.name
    },
     "publisher": {
      "@type": "Organization",
      "name": "storedevguide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://5lgivccarqkvddiv.public.blob.vercel-storage.com/storedevguide.com.webp"
      }
    },
    "description": article.contentHtml.replace(/<[^>]*>?/gm, '').substring(0, 160)
  };
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `${siteUrl}${item.href}` : fullUrl
    }))
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="border-b">
        <div className="container mx-auto px-3 md:px-6">
          <Breadcrumbs items={breadcrumbItems} className="py-4" />
        </div>
      </div>
      <div className="container mx-auto py-8 px-3 md:py-12 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents content={article.contentHtml} />
              </div>
            </aside>
            <main className="lg:col-span-6">
                <article>
                    <header className="mb-8">
                        <div className="mb-4 flex flex-wrap gap-2">
                          {article.tags.map((tag: string) => (
                              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                                  <Badge variant="secondary">{tag}</Badge>
                              </Link>
                          ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{article.title}</h1>
                        <div className="text-muted-foreground text-sm flex items-center flex-wrap gap-x-4 gap-y-2">
                            {article.authorV2 && (
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{article.authorV2.name}</span>
                                </div>
                            )}
                            <span className="hidden md:inline">•</span>
                            <span>{format(new Date(article.publishedAt), 'PPP')}</span>
                             <span className="hidden md:inline">•</span>
                            <div className="flex items-center gap-1.5">
                                <Eye className="h-4 w-4" />
                                <span>{article.viewCount.toLocaleString()} views</span>
                            </div>
                        </div>
                    </header>

                    {article.image && (
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-8 shadow-lg">
                        <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                        />
                    </div>
                    )}
                    
                    {pdfUrl && (
                      <div className="my-6 p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                          <p className="font-semibold">Want to read this offline?</p>
                          <Button asChild size="sm">
                              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download PDF
                              </a>
                          </Button>
                      </div>
                    )}

                    <div className="prose dark:prose-invert max-w-none mx-auto">
                      <ArticleContent content={article.contentHtml} />
                    </div>

                    <div className="flex items-center justify-center mt-8 space-x-4">
                      <LikeButton />
                      <ShareButtons title={article.title} />
                    </div>
                </article>

                <Suspense fallback={
                    <div className="mt-16 pt-12 border-t space-y-4">
                        <Skeleton className="h-8 w-1/2 mx-auto" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                }>
                    <div className="mt-16 pt-12 border-t">
                        <CommentSection />
                    </div>
                </Suspense>

                {relatedArticles.length > 0 && (
                     <Suspense fallback={
                        <div className="mt-16 pt-12 border-t space-y-8">
                            <h2 className="text-3xl font-bold font-headline mb-8 text-center"><Skeleton className="h-8 w-1/3 mx-auto" /></h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Skeleton className="h-64 w-full" />
                                <Skeleton className="h-64 w-full" />
                            </div>
                        </div>
                     }>
                        <div className="mt-16 pt-12 border-t">
                            <h2 className="text-3xl font-bold font-headline mb-8 text-center">Related Articles</h2>
                            <RelatedArticles articles={relatedArticles} />
                        </div>
                     </Suspense>
                )}
            </main>
            <aside className="lg:col-span-3 relative">
                <Suspense fallback={
                   <div className="space-y-8">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-64 w-full" />
                   </div>
                }>
                    <div className="lg:sticky lg:top-28">
                        <BlogSidebar />
                    </div>
                </Suspense>
            </aside>
        </div>
    </div>
    </>
  );
}

export async function generateStaticParams() {
  const { articles } = await getArticles(100); 
  return articles.map((article: any) => ({
    handle: article.handle,
  }));
}

export async function generateMetadata({ params }: NextPageProps<{ handle: string }>): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticleByHandle(resolvedParams.handle);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.contentHtml.replace(/<[^>]*>?/gm, '').substring(0, 160),
    openGraph: {
        title: article.title,
        description: article.contentHtml.replace(/<[^>]*>?/gm, '').substring(0, 160),
        images: article.image ? [
            {
                url: article.image.url,
                alt: article.image.altText || article.title,
            }
        ] : [],
    }
  };
}
