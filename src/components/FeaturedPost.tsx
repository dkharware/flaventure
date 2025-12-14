
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

interface Article {
  id: string;
  handle: string;
  title: string;
  excerptHtml: string;
  publishedAt: string;
  image?: {
    url: string;
    altText?: string;
  };
  authorV2: {
    name: string;
  };
  readTime: number;
}

export function FeaturedPost({ article }: { article: Article }) {
  if (!article) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      {article.image && (
        <Link href={`/blog/${article.handle}`} className="block group">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={article.image.url}
              alt={article.image.altText || article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </Link>
      )}
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold font-headline leading-tight">
          <Link href={`/blog/${article.handle}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h2>
        <div
            className="text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: article.excerptHtml }}
        />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {article.authorV2 && (
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
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
        </div>
        <div className="pt-2">
            <Button asChild variant="link" className="p-0 text-base font-semibold">
                <Link href={`/blog/${article.handle}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
