
import { getArticleByHandle, getArticles } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import type { Metadata } from 'next';

type ArticlePageProps = {
  params: { handle: string };
};

export async function generateStaticParams() {
  const articles = await getArticles(10); // Fetch a number of articles to pre-render
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

  return (
    <div className="container mx-auto py-12 px-6 md:px-10">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{article.title}</h1>
          <p className="text-muted-foreground">
            By {article.authorV2.name} on {format(new Date(article.publishedAt), 'PPP')}
          </p>
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

        <div
          className="prose prose-lg dark:prose-invert max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>
    </div>
  );
}
