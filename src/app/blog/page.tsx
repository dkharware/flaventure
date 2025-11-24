

import { getArticles, getAllTags } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { Suspense } from 'react';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Blog | easyfreecv',
  description: 'Read the latest articles and tips on resume building, career advice, and job searching from the easyfreecv team.',
};

interface BlogPageProps {
    searchParams?: {
        query?: string;
        tag?: string;
    };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const searchQuery = searchParams?.query;
  const tagQuery = searchParams?.tag;
  
  let query;
  if (searchQuery) {
    query = `title:*${searchQuery}* OR body:*${searchQuery}*`;
  } else if (tagQuery) {
    query = `tag:'${tagQuery}'`;
  }

  const articles = await getArticles(20, query);
  const allTags = await getAllTags();
  const recentPosts = await getArticles(5);

  const pageTitle = tagQuery ? `Posts tagged with "${tagQuery}"` : (searchQuery ? `Search results for "${searchQuery}"` : "Resume & Career Advice Blog");
  const pageDescription = tagQuery || searchQuery ? "" : "Get the latest insights on resume building, career advice, and industry trends.";

  const featuredArticle = articles && articles.length > 0 ? articles[0] : null;
  const otherArticles = articles && articles.length > 1 ? articles.slice(1) : [];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="lg:hidden fixed bottom-24 right-4 z-40">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" className="rounded-full shadow-lg">
                        <SlidersHorizontal className="h-5 w-5" />
                        <span className="sr-only">Open Filters</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="hide-scrollbar">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Blog Sidebar</SheetTitle>
                    <SheetDescription className="sr-only">Contains blog search, tags, and recent posts.</SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-full pr-6">
                    <Suspense fallback={<div>Loading sidebar...</div>}>
                        <BlogSidebar tags={allTags} recentPosts={recentPosts} />
                    </Suspense>
                  </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3">
                 <div className="mb-8 pt-4">
                    <div>
                        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">{pageTitle}</h1>
                        {pageDescription && <p className="text-lg text-muted-foreground mt-2 max-w-2xl">{pageDescription}</p>}
                    </div>
                </div>

                {articles && articles.length > 0 ? (
                    <div className="space-y-12">
                      {featuredArticle && !searchQuery && !tagQuery && (
                         <Link key={featuredArticle.id} href={`/blog/${featuredArticle.handle}`} className="block group md:block hidden">
                            <Card className="h-full flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                                {featuredArticle.image && (
                                <div className="relative h-48 md:h-auto md:w-1/2 overflow-hidden">
                                    <Image
                                    src={featuredArticle.image.url}
                                    alt={featuredArticle.image.altText || featuredArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                                        {featuredArticle.tags?.slice(0, 2).map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                )}
                                <div className="flex-1 flex flex-col p-6">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors line-clamp-3">{featuredArticle.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col p-0 mt-4">
                                        <div
                                            className="text-sm text-muted-foreground flex-grow line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: featuredArticle.excerptHtml }}
                                        />
                                        <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                                            <span>{format(new Date(featuredArticle.publishedAt), 'PPP')}</span>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                      )}

                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {(searchQuery || tagQuery || !featuredArticle ? articles : otherArticles).map((article: any) => (
                            <Link key={article.id} href={`/blog/${article.handle}`} className="block group">
                            <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                {article.image && (
                                <div className="relative h-32 w-full overflow-hidden">
                                    <Image
                                    src={article.image.url}
                                    alt={article.image.altText || article.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                                        {article.tags?.slice(0, 2).map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                )}
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base font-headline group-hover:text-primary transition-colors line-clamp-3">{article.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col p-4 pt-0">
                                    <div
                                        className="text-sm text-muted-foreground flex-grow line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: article.excerptHtml }}
                                    />
                                    <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                                        <span>{format(new Date(article.publishedAt), 'PPP')}</span>
                                    </div>
                                </CardContent>
                            </Card>
                            </Link>
                        ))}
                      </div>
                    </div>
                ) : (
                    <div className="text-center py-16 border rounded-lg bg-muted/20">
                        <h3 className="text-xl font-semibold">No Articles Found</h3>
                        <p className="text-muted-foreground mt-2">Please try another search or tag, or check back later.</p>
                        <Button asChild variant="outline" className="mt-4">
                            <Link href="/blog">Back to Blog</Link>
                        </Button>
                    </div>
                )}
            </main>
            <aside className="lg:col-span-1 lg:mt-24 hidden lg:block">
                <Suspense fallback={<div>Loading sidebar...</div>}>
                    <BlogSidebar tags={allTags} recentPosts={recentPosts} />
                </Suspense>
            </aside>
        </div>
    </div>
  );
}
