
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface Article {
  id: string;
  handle: string;
  title: string;
  publishedAt: string;
  image?: {
    url: string;
    altText?: string;
  };
  readTime: number;
}

export function PostCard({ article }: { article: Article }) {
  if (!article) return null;

  return (
    <div className="group">
        <Link href={`/blog/${article.handle}`}>
            {article.image && (
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-4 shadow-md">
                    <Image
                    src={article.image.url}
                    alt={article.image.altText || article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>
            )}
        </Link>
      <div className="space-y-2">
        <h3 className="text-lg font-bold font-headline leading-snug">
            <Link href={`/blog/${article.handle}`} className="hover:text-primary transition-colors">
                {article.title}
            </Link>
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(article.publishedAt), 'PPP')}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                <span>{article.readTime} min read</span>
            </div>
        </div>
        <div className="pt-1">
            <Button asChild variant="link" className="p-0 text-sm font-semibold">
                <Link href={`/blog/${article.handle}`}>
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
