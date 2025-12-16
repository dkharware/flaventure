'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Article {
    id: string;
    handle: string;
    title: string;
    publishedAt: string;
    image?: {
        url: string;
        altText?: string;
    };
    tags?: string[];
}

interface RelatedArticlesProps {
    articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((related: any) => (
                <Link key={related.id} href={`/blog/${related.handle}`} className="block group">
                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        {related.image && (
                            <div className="relative h-40 w-full overflow-hidden">
                                <Image src={related.image.url} alt={related.image.altText || related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                                    {related.tags?.slice(0, 2).map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors">{related.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">{new Date(related.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
