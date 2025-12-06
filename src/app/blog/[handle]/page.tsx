
import { getArticleByHandle, getRelatedArticles } from '@/lib/shopify';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, Eye, Download, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TableOfContents } from '@/components/TableOfContents';
import { ShareButtons } from '@/components/ShareButtons';
import { LikeButton } from '@/components/LikeButton';
import { Skeleton } from '@/components/ui/skeleton';
import Script from 'next/script';
import { getSiteUrl } from '@/lib/utils';

const CommentSection = lazy(() => import('@/components/CommentSection'));
const RelatedArticles = lazy(() => import('@/components/RelatedArticles'));

export default async function ArticlePage({ params }: { params: { handle: string } }) {
  const article = await getArticleByHandle(params.handle);

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
        <div className="lg:hidden fixed bottom-24 right-4 z-40">
          <Sheet>
              <SheetTrigger asChild>
                  <Button size="icon" className="rounded-full shadow-lg" aria-label="Open Filters & Recent Posts">
                      <SlidersHorizontal className="h-5 w-5" />
                  </Button>
              </SheetTrigger>
              <SheetContent className="hide-scrollbar">
                <SheetHeader>
                  <SheetTitle className="sr-only">Blog Sidebar</SheetTitle>
                  <SheetDescription className="sr-only">Contains blog search, tags, and recent posts.</SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-full pr-6">
                  <Suspense fallback={
                     <div className="space-y-8">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-64 w-full" />
                     </div>
                  }>
                      <BlogSidebar />
                  </Suspense>
                </ScrollArea>
              </SheetContent>
          </Sheet>
        </div>
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents content={article.contentHtml} />
              </div>
            </aside>
            <main className="lg:col-span-6">
                <article>
                    <header className="mb-8 text-center pt-4">
                        <div className="mb-4 flex flex-wrap gap-2 justify-center">
                          {article.tags.map((tag: string) => (
                              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                                  <Badge variant="secondary" className="shadow-md">{tag}</Badge>
                              </Link>
                          ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{article.title}</h1>
                        <div className="text-muted-foreground text-sm flex items-center justify-center flex-wrap gap-x-4 gap-y-2">
                            {article.authorV2 && (
                                <>
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>{article.authorV2.name}</span>
                                </div>
                                <span className="text-xs hidden md:inline">•</span>
                                </>
                            )}
                            <p>{format(new Date(article.publishedAt), 'PPP')}</p>
                            <span className="text-xs hidden md:inline">•</span>
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{article.viewCount.toLocaleString()} views</span>
                            </div>
                        </div>
                        {pdfUrl && (
                          <div className="mt-6 flex justify-center">
                              <Button asChild>
                                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                                      <Download className="mr-2 h-4 w-4" />
                                      Download PDF
                                  </a>
                              </Button>
                          </div>
                        )}
                    </header>

                    {article.image && (
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-8 shadow-lg">
                        <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover"
                        priority
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
                            <Skeleton className="h-8 w-1/3 mx-auto" />
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
            <aside className="lg:col-span-3 relative hidden lg:block">
                <Suspense fallback={
                   <div className="space-y-8">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-64 w-full" />
                   </div>
                }>
                    <BlogSidebar />
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

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const article = await getArticleByHandle(params.handle);

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
