
import { getArticles } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight, Eye, User } from "lucide-react";

export async function RecentPosts() {
    const { articles } = await getArticles(3);

    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-8 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Recent Adventures & Recipes</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                            Check out our most recent stories, travel guides, and culinary discoveries from around the globe.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 pt-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    {articles.map((article, index) => (
                         <Link key={article.id} href={`/blog/${article.handle}`} className="block group">
                            <div className="relative overflow-hidden rounded-xl">
                                <Image
                                    src={article.image?.url || 'https://picsum.photos/seed/recent-post/400/250'}
                                    alt={article.image?.altText || article.title}
                                    width={400}
                                    height={250}
                                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint="travel landscape"
                                    priority={index === 0}
                                />
                                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                                    {article.tags?.slice(0, 1).map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="py-4">
                                <h3 className="text-lg font-bold font-headline leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2" dangerouslySetInnerHTML={{ __html: article.excerptHtml }} />
                                <div className="text-xs text-muted-foreground mt-2 pt-2 border-t flex flex-wrap gap-x-3 gap-y-1 items-center">
                                    <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        <span>{article.authorV2.name}</span>
                                    </div>
                                    <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        <span>{article.viewCount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                         </Link>
                    ))}
                </div>
                 <div className="mt-8 flex justify-center">
                    <Button asChild>
                        <Link href="/blog">See All Stories <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
