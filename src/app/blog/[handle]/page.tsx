
import { getArticleByHandle, getRelatedArticles, getAllTags, getArticles } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { Suspense, lazy } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArticleContent } from '@/components/ArticleContent';
import { Eye, Clock, Calendar } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TableOfContents } from '@/components/TableOfContents';
import { ShareButtons } from '@/components/ShareButtons';
import { LikeButton } from '@/components/LikeButton';
import { Skeleton } from '@/components/ui/skeleton';
import Script from 'next/script';
import { getSiteUrl } from '@/lib/utils';
import { NextPageProps } from '@/app/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FaqSection from '@/components/FaqSection';

const CommentSection = lazy(() => import('@/components/CommentSection'));
const RelatedArticles = lazy(() => import('@/components/RelatedArticles'));

export default async function ArticlePage({ params }: NextPageProps<{ handle: string }>) {
  const resolvedParams = await params;
  const article = await getArticleByHandle(resolvedParams.handle);

  if (!article) {
    notFound();
  }
  
  const [relatedArticles, tagsData, recentPostsData] = await Promise.all([
      getRelatedArticles(article.handle, article.tags),
      getAllTags(),
      getArticles(5).then(res => res.articles)
  ]);
  
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
        "url": "https://5lgivccarqkvddiv.public.blob.vercel-storage.com/newlogo.webp"
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
      <div className="w-full bg-background/50 backdrop-blur-lg border-b">
        <div className="container mx-auto px-3 md:px-6">
            <Breadcrumbs items={breadcrumbItems} className="py-4" />
        </div>
      </div>
      <div className="container mx-auto py-8 px-3 md:py-12 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <main className="lg:col-span-9">
                <article>
                    <header className="mb-8">
                        <div className="mb-4 flex flex-wrap gap-2">
                          {article.tags.map((tag: string) => (
                              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                                  <Badge variant="secondary">{tag}</Badge>
                              </Link>
                          ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold font-headline mb-4">{article.title}</h1>
                        <div className="text-muted-foreground text-sm flex items-center flex-wrap gap-x-6 gap-y-2">
                            {article.authorV2 && (
                                <div className="flex items-center gap-2">
                                    <Image src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg" alt={article.authorV2.name} width={24} height={24} className="rounded-full" />
                                    <span>{article.authorV2.name}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                <span>{article.readTime} min read</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Eye className="h-4 w-4" />
                                <span>{article.viewCount.toLocaleString()} views</span>
                            </div>
                        </div>
                    </header>

                    <Accordion type="single" collapsible className="w-full border rounded-lg px-4 bg-card mb-8">
                        <AccordionItem value="toc">
                            <AccordionTrigger className="text-lg font-semibold">Table of Contents</AccordionTrigger>
                            <AccordionContent>
                                <TableOfContents content={article.contentHtml} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {article.image && (
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
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
                    
                    <div className="prose dark:prose-invert max-w-none mx-auto">
                      <ArticleContent content={article.contentHtml} />
                    </div>

                    <div className="flex items-center justify-center mt-8 space-x-4">
                      <LikeButton />
                      <ShareButtons title={article.title} />
                    </div>
                </article>
                 <Suspense fallback={
                  <div className="mt-16 pt-12 border-t border-border/10 space-y-4">
                      <Skeleton className="h-8 w-1/2 mx-auto" />
                      <Skeleton className="h-24 w-full" />
                  </div>
              }>
                  <div className="mt-16 pt-12 border-t border-border/10">
                      <CommentSection />
                  </div>
              </Suspense>

              {relatedArticles.length > 0 && (
                   <Suspense fallback={
                      <div className="mt-16 pt-12 border-t border-border/10 space-y-8">
                          <h2 className="text-3xl font-bold font-headline mb-8 text-center"><Skeleton className="h-8 w-1/3 mx-auto" /></h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <Skeleton className="h-64 w-full" />
                              <Skeleton className="h-64 w-full" />
                          </div>
                      </div>
                   }>
                      <div className="mt-16 pt-12 border-t border-border/10">
                          <h2 className="text-3xl font-bold font-headline mb-8 text-center">Related Articles</h2>
                          <RelatedArticles articles={relatedArticles} />
                      </div>
                   </Suspense>
              )}
            </main>
            <aside className="lg:col-span-3">
                 <Suspense fallback={
                   <div className="space-y-8">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-64 w-full" />
                   </div>
                }>
                    <div className="lg:sticky lg:top-28">
                        <BlogSidebar tags={tagsData} recentPosts={recentPostsData} />
                    </div>
                </Suspense>
            </aside>
        </div>
      </div>
      <FaqSection filter="Blogging & Content" />
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

    