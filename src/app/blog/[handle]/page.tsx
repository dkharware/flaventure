
import { getArticleByHandle, getArticles, getAllTags, getRelatedArticles } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { Suspense } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArticleContent } from '@/components/ArticleContent';

type ArticlePageProps = {
  params: { handle: string };
};

export async function generateStaticParams() {
  const articles = await getArticles(10); 
  return articles.map((article: any) => ({
    handle: article.handle,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleByHandle(params.handle);
  
  if (!article) {
    notFound();
  }

  const allTags = await getAllTags();
  const recentPosts = await getArticles(5);
  const relatedArticles = await getRelatedArticles(article.handle, article.tags);

  return (
    <div className="container mx-auto py-12 px-6 md:px-10">
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3">
                <article className="max-w-4xl mx-auto">
                    <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{article.title}</h1>
                    <div className="text-muted-foreground text-sm flex items-center gap-4">
                        <p>By {article.authorV2.name}</p>
                        <span>|</span>
                        <p>{format(new Date(article.publishedAt), 'PPP')}</p>
                    </div>
                     {article.tags && article.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag: string) => (
                            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                                <Badge variant="secondary">{tag}</Badge>
                            </Link>
                        ))}
                        </div>
                    )}
                    </header>

                    {article.image && (
                    <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
                        <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover"
                        priority
                        />
                    </div>
                    )}

                    <ArticleContent content={article.contentHtml} />
                </article>

                {relatedArticles.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold font-headline mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedArticles.map((related: any) => (
                                <Link key={related.id} href={`/blog/${related.handle}`} className="block group">
                                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        {related.image && (
                                            <div className="relative h-40 w-full overflow-hidden">
                                                <Image src={related.image.url} alt={related.image.altText || related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors">{related.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-xs text-muted-foreground">{format(new Date(related.publishedAt), 'PPP')}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <aside className="lg:col-span-1">
                 <Suspense fallback={<div>Loading sidebar...</div>}>
                    <BlogSidebar tags={allTags} recentPosts={recentPosts} />
                </Suspense>
            </aside>
        </div>
    </div>
  );
}
